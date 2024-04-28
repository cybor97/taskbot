import { Repository } from "typeorm";
import humanId from "human-id";
import { User } from "../entities/user";
import AppDataSource from "..";
import { Task } from "../entities/task";
import { UserTask } from "../entities/userTask";
import { TelegramUserData } from "@telegram-auth/server";

export class UserDao {
  private userRepository: Repository<User>;
  private taskRepository: Repository<Task>;
  private userTaskRepository: Repository<UserTask>;
  private static dao: UserDao;

  private constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.taskRepository = AppDataSource.getRepository(Task);
    this.userTaskRepository = AppDataSource.getRepository(UserTask);
  }

  public static getDao(): UserDao {
    if (!UserDao.dao) {
      UserDao.dao = new UserDao();
    }
    return UserDao.dao;
  }

  public async getReferralsCount(userId: number): Promise<number> {
    return await this.userRepository.count({
      where: { referredBy: { id: userId } },
    });
  }

  public async initUser(
    telegramUser: TelegramUserData,
    referralCode: string | null,
  ): Promise<User> {
    const [user, created] = await this.getOrCreateUser(
      telegramUser,
      referralCode,
    );
    if (created) {
      await this.generateUserTasks(user.id);
    }
    return user;
  }

  public async getOrCreateUser(
    telegramUser: TelegramUserData,
    referralCode: string | null,
  ): Promise<[User, boolean]> {
    const tgId = telegramUser.id.toString();
    const user = await this.userRepository.findOne({
      where: { tgId },
    });
    if (user !== null) {
      return [user, false];
    }

    const newUserData = new User();
    newUserData.tgId = tgId;
    newUserData.isActive = true;
    newUserData.referralCode = `${humanId({
      separator: "",
    })}${Date.now().toString(32)}`;
    newUserData.username = telegramUser.username ?? null;

    if (referralCode !== null) {
      const referredBy = await this.userRepository.findOne({
        where: { referralCode },
      });
      if (referredBy !== null) {
        newUserData.referredBy = referredBy;
      }
    }

    const newUser = await this.userRepository.save(newUserData, {
      reload: true,
    });
    return [newUser, true];
  }

  public async generateUserTasks(userId: number): Promise<void> {
    const tasks = await this.taskRepository.find({
      select: ["id", "reward"],
      where: { active: true },
    });
    const userTasks = tasks.map((task) => {
      return {
        task: { id: task.id },
        user: { id: userId },
        reward: task.reward,
        completed: false,
      };
    });
    await this.userTaskRepository.save(userTasks);
  }

  public async setWalletId(user: User, walletId: string): Promise<void> {
    user.tonWalletId = walletId;
    await this.userRepository.save(user);
  }
}

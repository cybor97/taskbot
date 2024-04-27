import { Repository } from "typeorm";
import { User } from "../entities/user";
import AppDataSource from "..";

export class UserDao {
  private userRepository: Repository<User>;
  private static dao: UserDao;

  private constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public static async getDao(): Promise<UserDao> {
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
}

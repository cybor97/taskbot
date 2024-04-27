import { Repository } from "typeorm";
import AppDataSource from "..";
import { UserTask } from "../entities/userTask";

export class TaskDao {
  private userTaskRepository: Repository<UserTask>;
  private static dao: TaskDao;

  constructor() {
    this.userTaskRepository = AppDataSource.getRepository(UserTask);
  }

  public static async getDao(): Promise<TaskDao> {
    if (!TaskDao.dao) {
      TaskDao.dao = new TaskDao();
    }
    return TaskDao.dao;
  }

  public async getTasksCompletedCount(userId: number): Promise<number> {
    return await this.userTaskRepository.count({
      where: { user: { id: userId }, completed: true },
    });
  }

  public async getTotalXP(userId: number): Promise<number> {
    return (
      (await this.userTaskRepository.sum("reward", {
        user: { id: userId },
      })) ?? 0
    );
  }
}

import { Repository } from "typeorm";
import AppDataSource from "..";
import { UserTask } from "../entities/userTask";
import { TaskGroup } from "../entities/taskGroup";
import { User } from "../entities/user";

export class TaskDao {
  private userTaskRepository: Repository<UserTask>;
  private taskGroupRepository: Repository<TaskGroup>;
  private static dao: TaskDao;

  constructor() {
    this.userTaskRepository = AppDataSource.getRepository(UserTask);
    this.taskGroupRepository = AppDataSource.getRepository(TaskGroup);
  }

  public static getDao(): TaskDao {
    if (!TaskDao.dao) {
      TaskDao.dao = new TaskDao();
    }
    return TaskDao.dao;
  }

  public async getTasksGroupped(user: User): Promise<TaskGroup[]> {
    return await this.taskGroupRepository.find({
      select: {
        id: true,
        name: true,
        tasks: {
          id: true,
          name: true,
          description: true,
          userTasks: {
            id: true,
            completed: true,
            reward: true,
          },
        },
      },
      where: {
        tasks: {
          userTasks: {
            user: { id: user.id },
          },
        },
      },
      relations: {
        tasks: {
          userTasks: true,
        },
      },
    });
  }

  public async getTaskById(taskId: number): Promise<UserTask | null> {
    return await this.userTaskRepository.findOne({
      where: { id: taskId },
      relations: {
        task: true,
        user: true,
      },
    });
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

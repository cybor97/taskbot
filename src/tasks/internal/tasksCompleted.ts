import { TaskDao } from "../../orm/dao/taskDao";

export class TasksCompletedTask {
    async verify(userId: number, data: { expected: number }): Promise<boolean> {
      const { expected } = data;
      const taskDao = await TaskDao.getDao();
      const totalXP = await taskDao.getTasksCompletedCount(userId);
      return totalXP >= expected;
    }
  }
  
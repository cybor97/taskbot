import { TaskDao } from "../../orm/dao/taskDao";
import { User } from "../../orm/entities/user";
import { TaskVerifier } from "../task";

export class XPTask extends TaskVerifier {
  async verify(user: User, data: { expected: number }): Promise<boolean> {
    const { expected } = data;
    const taskDao = TaskDao.getDao();
    const totalXP = await taskDao.getTotalXP(user.id);
    return totalXP >= expected;
  }
}

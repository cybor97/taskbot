import { UserDao } from "../../orm/dao/userDao";
import { User } from "../../orm/entities/user";
import { TaskVerifier } from "../task";

export class ReferralsTask extends TaskVerifier {
  async verify(user: User, data: { expected: number }): Promise<boolean> {
    const { expected } = data;
    const userDao = UserDao.getDao();
    const totalXP = await userDao.getReferralsCount(user.id);
    return totalXP >= expected;
  }
}

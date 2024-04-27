import { UserDao } from "../../orm/dao/userDao";

export class ReferralsTask {
    async verify(userId: number, data: { expected: number }): Promise<boolean> {
      const { expected } = data;
      const userDao = await UserDao.getDao();
      const totalXP = await userDao.getReferralsCount(userId);
      return totalXP >= expected;
    }
  }
  
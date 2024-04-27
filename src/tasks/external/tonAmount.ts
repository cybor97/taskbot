import { User } from "../../orm/entities/user";
import { getTonapiClient } from "../tonapi";

export class TonAmountTask {
  async verify(user: User, data: { amount: number | null }): Promise<boolean> {
    if (user.tonWalletId === null) {
      return false;
    }
    const client = getTonapiClient();

    const account = await client.accounts.getAccount(user.tonWalletId);

    return BigInt(account.balance) >= BigInt(data.amount ?? 0);
  }
}

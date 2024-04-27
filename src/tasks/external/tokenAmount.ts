import { User } from "../../orm/entities/user";
import { getTonapiClient } from "../tonapi";

export class TokenAmountTask {
  async verify(
    user: User,
    data: { currencies: string[]; amount: number | null },
  ): Promise<boolean> {
    if (user.tonWalletId === null) {
      return false;
    }
    const { currencies } = data;
    const client = getTonapiClient();

    const balances = await client.accounts.getAccountJettonsBalances(
      user.tonWalletId,
      {
        currencies,
      },
    );
    return balances.balances.every((balance) => {
      if (data.amount === null) {
        return BigInt(balance.balance) > BigInt(0);
      }
      return BigInt(balance.balance) >= BigInt(data.amount ?? 0);
    });
  }
}

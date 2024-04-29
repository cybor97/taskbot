import { User } from "../../orm/entities/user";
import { TaskVerifier } from "../task";
import { getTonapiClient } from "../tonapi";

export class TokenAmountTask extends TaskVerifier {
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
    const balancesCurrencies = balances.balances.filter((balance) =>
      currencies.includes(balance.jetton.symbol),
    );
    if (balancesCurrencies.length === 0) {
      return false;
    }

    balancesCurrencies.every((balance) => {
      if (data.amount === null) {
        return BigInt(balance.balance) > BigInt(0);
      }
      return BigInt(balance.balance) >= BigInt(data.amount ?? 0);
    });
  }
}

import { User } from "../../orm/entities/user";
import { TaskVerifier } from "../task";
import { getTonapiClient } from "../tonapi";

export class HasNFTTask extends TaskVerifier {
  async verify(user: User, data: { collection: string }): Promise<boolean> {
    if (user.tonWalletId === null) {
      return false;
    }
    const { collection } = data;
    const client = getTonapiClient();

    const nftItems = await client.accounts.getAccountNftItems(
      user.tonWalletId,
      {
        collection,
        limit: 1,
      },
    );
    return nftItems.nft_items.length >= 1;
  }
}

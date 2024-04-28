import { User } from "../../orm/entities/user";
import { TaskVerifier } from "../task";

export class HasWalletTask extends TaskVerifier {
  async verify(user: User): Promise<boolean> {
    return user.tonWalletId !== null;
  }
}

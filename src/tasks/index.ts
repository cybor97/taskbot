import { DefaultTask } from "./external/default";
import { HasNFTTask } from "./external/hasNft";
import { HasWalletTask } from "./external/hasWallet";
import { SubscribedTask } from "./external/subscribed";
import { TokenAmountTask } from "./external/tokenAmount";
import { TonAmountTask } from "./external/tonAmount";
import { ReferralsTask } from "./internal/referrals";
import { TasksCompletedTask } from "./internal/tasksCompleted";
import { XPTask } from "./internal/xp";

const taskVerifierMap = {
  default: new DefaultTask(),
  hasNft: new HasNFTTask(),
  subscribed: new SubscribedTask(),
  tokenAmount: new TokenAmountTask(),
  tonAmount: new TonAmountTask(),
  referrals: new ReferralsTask(),
  tasksCompleted: new TasksCompletedTask(),
  xp: new XPTask(),
  hasWallet: new HasWalletTask(),
};

export default taskVerifierMap;

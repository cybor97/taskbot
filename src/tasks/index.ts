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
  default: DefaultTask,
  hasNft: HasNFTTask,
  subscribed: SubscribedTask,
  tokenAmount: TokenAmountTask,
  tonAmount: TonAmountTask,
  referrals: ReferralsTask,
  tasksCompleted: TasksCompletedTask,
  xp: XPTask,
  hasWallet: HasWalletTask
};

export default taskVerifierMap;

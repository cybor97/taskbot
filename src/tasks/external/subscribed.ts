import { ChatMember } from "telegraf/typings/core/types/typegram";
import { User } from "../../orm/entities/user";
import logger from "../../utils/logger";
import { getTelegraf } from "../telegraf";
import { TaskVerifier } from "../task";

export class SubscribedTask extends TaskVerifier {
  async verify(user: User, data: { chatId: string }): Promise<boolean> {
    if (user.tgId === null) {
      return false;
    }

    const { chatId } = data;
    const telegraf = getTelegraf();
    try {
      const chatMember = ((await telegraf.telegram.getChatMember(
        chatId,
        parseInt(user.tgId),
      )) ?? null) as ChatMember | null;
      return chatMember !== null && chatMember.status !== "left";
    } catch (e) {
      logger.error(`[SubscribedTask][verify] ${e}`);
      return false;
    }
  }
}

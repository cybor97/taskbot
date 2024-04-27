import { ChatMember } from "telegraf/typings/core/types/typegram";
import { User } from "../../orm/entities/user";
import logger from "../../utils/logger";
import { getTelegraf } from "../telegraf";

export class SubscribedTask {
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
      return chatMember !== null;
    } catch (e) {
      logger.error(`[SubscribedTask][verify] ${e}`);
      return false;
    }
  }
}

import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

export function initBot(): void {
  const botToken = process.env.BOT_TOKEN ?? null;
  if (botToken === null) {
    throw new Error("No bot token provided");
  }
  const url = process.env.WEB_APP_URL ?? null;
  if (url === null) {
    throw new Error("No web app url provided");
  }

  const bot = new Telegraf(botToken);
  bot.start((ctx) =>
    ctx.reply("Welcome!", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open",
              web_app: {
                url,
              },
            },
          ],
        ],
      },
    }),
  );
  bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

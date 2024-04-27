const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

function initBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start((ctx) =>
    ctx.reply("Welcome!", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open",
              web_app: {
                url: process.env.WEB_APP_URL,
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

module.exports = {
  initBot,
};

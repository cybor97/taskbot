import { Telegraf } from "telegraf";

export function getTelegraf() {
  const botToken = process.env.BOT_TOKEN ?? null;
  if (botToken === null) {
    throw new Error("No bot token provided");
  }
  return new Telegraf(botToken);
}

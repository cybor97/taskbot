import { initBot } from "./entryPoints/bot";
import { initAPI } from "./entryPoints/api";
import AppDataSource from "./orm";

async function main() {
  await AppDataSource.initialize();
  initBot();
  initAPI();
}

main();

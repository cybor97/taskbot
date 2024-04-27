import { initBot } from "./entryPoints/bot";
import { initAPI } from "./entryPoints/api";

function main() {
  initBot();
  initAPI();
}

main();

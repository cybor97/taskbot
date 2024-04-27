require("dotenv").config();

const { initBot } = require("./bot");
const { initAPI } = require("./api");

function main() {
    initBot();
    initAPI();
}

main();

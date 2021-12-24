require("dotenv").config();

import { bots, Bot } from "./lib/bot";

import getEthUsdPrice from "./lib/eth/getEthUsdPrice";
import getSquidEthPrice from "./lib/eth/getSquidEthPrice";
import getSquidSupply from "./lib/eth/getSquidSupply";
import getSSquidSupply from "./lib/eth/getSSquidSupply";
import getSSquidIndex from "./lib/eth/getSSquidIndex";

async function tick(bots: Bot<any>[]) {
  const [squidEthPrice, ethUsdPrice, squidSupply, sSquidSupply, sSquidIndex] =
    await Promise.all([
      getSquidEthPrice(),
      getEthUsdPrice(),
      getSquidSupply(),
      getSSquidSupply(),
      getSSquidIndex(),
    ]);

  bots.forEach((bot) => {
    bot.update({
      squidEthPrice,
      ethUsdPrice,
      squidSupply,
      sSquidSupply,
      sSquidIndex,
    });
  });
}

async function refreshDisplay(bots: Bot<any>[]) {
  bots.forEach((bot) => {
    bot.refreshDisplay();
  });
}

async function go() {
  await Promise.all(bots.map((bot) => bot.init()));

  await tick(bots);
  await tick(bots);
  refreshDisplay(bots);
  setInterval(() => tick(bots), 1000 * 120);
  setInterval(() => refreshDisplay(bots), 1000 * 30);
}

go();

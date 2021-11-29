require("dotenv").config();

import { bots, Bot } from "./lib/bots";

import getEthUsdPrice from "./lib/eth/getEthUsdPrice";
import getSquidEthPrice from "./lib/eth/getSquidEthPrice";

async function tick(bots: Bot[]) {
  const [squidEthPrice, ethUsdPrice] = await Promise.all([
    getSquidEthPrice(),
    getEthUsdPrice(),
  ]);

  bots.forEach((bot) => {
    bot.update({
      squidEthPrice,
      ethUsdPrice,
    });
  });
}

async function go() {
  await Promise.all(bots.map((bot) => bot.init()));

  tick(bots);
  setInterval(() => tick(bots), 1000 * 60);
}

go();

require("dotenv").config();

import Bot from "./lib/bots/bot";
import SquidPriceBot from "./lib/bots/squidPrice";
import EthPriceBot from "./lib/bots/ethPrice";

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
  const bots = [new SquidPriceBot(), new EthPriceBot()];
  await Promise.all(bots.map((bot) => bot.init()));

  tick(bots);
  setInterval(() => tick(bots), 1000 * 60);
}

go();

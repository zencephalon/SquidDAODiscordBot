require("dotenv").config();

import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

import sushi from "./lib/abi/sushi";

import Bot from "./lib/bots/bot";
import SquidPriceBot from "./lib/bots/squidPrice";
import EthPriceBot from "./lib/bots/ethPrice";

export const provider = new ethers.providers.InfuraProvider(
  1,
  process.env.INFURA_PROJECT
);

const SQUID_WETH_PAIR = "0xfad704847967d9067df7a60910399155fca43fe8";
const USDC_WETH_PAIR = "0x397ff1542f962076d0bfe58ea045ffa2d347aca0";

const squidWethSushiswap = new Contract(SQUID_WETH_PAIR, sushi, provider);
const usdcWethSushiswap = new Contract(USDC_WETH_PAIR, sushi, provider);

async function getSquidEthPrice() {
  const [r0, r1] = await squidWethSushiswap.functions["getReserves"]();

  const price = r1 / r0 / 1e9;
  return price;
}

async function getEthUsdPrice() {
  const [r0, r1] = await usdcWethSushiswap.functions["getReserves"]();

  const price = r0 / r1.div(1e12);
  return price;
}

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

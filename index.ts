require("dotenv").config();

// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";

import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

import abi from "./lib/abi";

export const provider = new ethers.providers.InfuraProvider(
  1,
  process.env.INFURA_PROJECT
);

const SQUID_WETH_PAIR = "0xfad704847967d9067df7a60910399155fca43fe8";
const USDC_WETH_PAIR = "0x397ff1542f962076d0bfe58ea045ffa2d347aca0";

const squidWethSushiswap = new Contract(SQUID_WETH_PAIR, abi, provider);

const usdcWethSushiswap = new Contract(USDC_WETH_PAIR, abi, provider);

async function getSquidEthPrice() {
  const [r0, r1] = await squidWethSushiswap.functions["getReserves"]();

  const price = r1.div(r0).div(1e9);
  return price;
}

async function getEthUsdPrice() {
  const [r0, r1] = await usdcWethSushiswap.functions["getReserves"]();

  const price = r0.div(r1.div(1e12));
  return price;
}

async function tick(client: Client) {
  const [price, ethPrice] = await Promise.all([
    getSquidEthPrice(),
    getEthUsdPrice(),
  ]);

  const guilds = client.guilds.cache;
  await Promise.all(
    guilds.map(async (guild) => {
      const g = await guild.fetch();
      const n = g.me?.nickname;
      const lastPrice = parseInt(n?.match(/^Ξ(\d+)/)?.[1] || "");
      const isFlat = lastPrice == price;
      const updown = isFlat ? "→" : lastPrice < price ? "↗" : "↘";

      console.log({
        lastPrice,
        price: price.toString(),
        usd: price * ethPrice,
      });

      g.me?.setNickname(
        `Ξ${price} ${updown}${isFlat ? "" : Math.abs(lastPrice - price)}`
      );
    })
  );

  const usdPrice = price * ethPrice;
  console.log({ usdPrice });

  await client.user?.setPresence({
    activity: { name: `\$${usdPrice.toLocaleString()}`, type: 3 },
    status: "online",
  });
}

async function go() {
  const client = new Client({ ws: { intents: [Intents.FLAGS.GUILDS] } });
  client.on("debug", console.log);
  await client.login(process.env.DISCORD_TOKEN);
  tick(client);
  setInterval(() => tick(client), 1000 * 60);
}

go();

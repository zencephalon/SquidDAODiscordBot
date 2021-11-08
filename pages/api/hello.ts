// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";

import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

import abi from "../../lib/abi";

export const provider = new ethers.providers.InfuraProvider(
  1,
  process.env.INFURA_PROJECT
);

const sushiswap = new Contract(
  // "0xc96f20099d96b37d7ede66ff9e4de59b9b1065b1",
  "0xfad704847967d9067df7a60910399155fca43fe8",
  abi,
  provider
);

async function go() {
  // const balance = await provider.getBalance("zencephalon.eth");

  // console.log({ balance: ethers.utils.formatEther(balance) });
  const [r0, r1] = await sushiswap.functions["getReserves"]();

  console.log(r0.toString(), r1.toString());
  const price = r1.div(r0).div(1e9);
  console.log(price.toString());
  return price;
}

type Data = {
  iluvu: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  client.once("ready", () => {
    console.log("Ready!");
  });
  await client.login(process.env.DISCORD_TOKEN);
  const guilds = await client.guilds.fetch();
  const price = await go();

  await Promise.all([
    guilds.map(async (guild) => {
      const g = await guild.fetch();
      g.me?.setNickname(`Ξ${price}`);
    }),
  ]);

  res.status(200).json({ iluvu: true });
}

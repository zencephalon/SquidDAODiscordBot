import Bot from "./bot";

import { Client, Intents } from "discord.js";

import { formatCents } from "./format";
class EthPrice implements Bot {
  client: Client;
  lastPrice?: number;

  constructor() {
    this.client = new Client({ ws: { intents: [Intents.FLAGS.GUILDS] } });
    this.client.on("debug", console.log);
    this.lastPrice = undefined;
  }

  async init() {
    return this.client.login(process.env.ETH_PRICE_TOKEN);
  }

  getMomentum(price: number) {
    if (!this.lastPrice) {
      return "→";
    }
    if (this.lastPrice == price) {
      return "→";
    }

    const updown = this.lastPrice < price ? "↗" : "↘";
    return `${updown}${Math.abs(this.lastPrice - price)}`;
  }

  async update({ ethUsdPrice }: { ethUsdPrice: number }) {
    const price = ethUsdPrice;
    const momentum = this.getMomentum(price);

    const guilds = this.client.guilds.cache;
    await Promise.all(
      guilds.map(async (guild) => {
        const g = await guild.fetch();
        g.me?.setNickname(`$${formatCents(price)} ${momentum}`);
      })
    );

    console.log({
      lastPrice: this.lastPrice,
      price: price,
    });

    this.lastPrice = price;
  }
}

export default EthPrice;

import Bot from "./bot";

import { Client, Intents } from "discord.js";

import { formatEth, formatDollars } from "./format";

class SquidPrice implements Bot {
  client: Client;
  lastPrice?: number;

  constructor() {
    this.client = new Client({ ws: { intents: [Intents.FLAGS.GUILDS] } });
    this.client.on("debug", console.log);
    this.lastPrice = undefined;
  }

  async init() {
    return this.client.login(process.env.SQUID_PRICE_TOKEN);
  }

  getMomentum(price: number) {
    if (!this.lastPrice) {
      return "→";
    }
    if (this.lastPrice == price) {
      return "→";
    }

    const updown = this.lastPrice < price ? "↗" : "↘";
    return `${updown}${formatEth(Math.abs(this.lastPrice - price))}`;
  }

  async update({
    squidEthPrice,
    ethUsdPrice,
  }: {
    squidEthPrice: number;
    ethUsdPrice: number;
  }) {
    const price = squidEthPrice;
    const ethPrice = ethUsdPrice;
    const usdPrice = price * ethPrice;
    const momentum = this.getMomentum(price);

    const guilds = this.client.guilds.cache;
    await Promise.all(
      guilds.map(async (guild) => {
        const g = await guild.fetch();
        g.me?.setNickname(`Ξ${formatEth(price)} ${momentum}`);
      })
    );

    await this.client.user?.setPresence({
      activity: {
        name: `\$${formatDollars(usdPrice)}`,
        type: 3,
      },
      status: "online",
    });

    console.log({
      lastPrice: this.lastPrice,
      price: price,
      usd: price * ethPrice,
    });

    this.lastPrice = price;
  }
}

export default SquidPrice;

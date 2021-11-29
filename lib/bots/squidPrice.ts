import Bot from "./bot";

import { Client, Intents } from "discord.js";

import { formatEth, formatDollars } from "./utils/format";

class SquidPrice extends Bot {
  lastPrice?: number;

  constructor() {
    super(process.env.SQUID_PRICE_TOKEN);
    this.lastPrice = undefined;
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

    this.setNickname(`Ξ${formatEth(price)} ${momentum}`);

    await this.client.user?.setPresence({
      activities: [
        {
          name: `\$${formatDollars(usdPrice)}`,
          type: 3,
        },
      ],
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

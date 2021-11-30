import Bot from "./bot";

import { formatEth } from "./utils/format";

class SquidPriceEth extends Bot {
  lastPrice?: number;

  constructor() {
    super(process.env.SQUID_PRICE_ETH);
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
  }: {
    squidEthPrice: number;
    ethUsdPrice: number;
    squidSupply: number;
  }) {
    const price = squidEthPrice;
    const momentum = this.getMomentum(price);

    this.setNickname(`Ξ${formatEth(price)} ${momentum}`);
    this.setStatus("Price in ETH");

    this.lastPrice = price;
  }
}

export default SquidPriceEth;

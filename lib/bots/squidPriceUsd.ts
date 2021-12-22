import Bot from "./bot";

import { formatDollars } from "./utils/format";

class SquidPriceUsd extends Bot<{}> {
  lastPrice?: number;

  constructor() {
    super(process.env.SQUID_PRICE_USD);
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
    return `${updown}${formatDollars(Math.abs(this.lastPrice - price))}`;
  }

  async update({
    squidEthPrice,
    ethUsdPrice,
  }: {
    squidEthPrice: number;
    ethUsdPrice: number;
    squidSupply: number;
  }) {
    const price = squidEthPrice;
    const ethPrice = ethUsdPrice;
    const usdPrice = price * ethPrice;
    const momentum = this.getMomentum(usdPrice);

    this.setNickname(`\$${formatDollars(usdPrice)} ${momentum}`);
    this.setStatus("Price in USD");

    this.lastPrice = usdPrice;
  }
}

export default SquidPriceUsd;

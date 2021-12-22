import Bot from "./bot";

import { formatCents } from "./utils/format";

class EthPriceUsd extends Bot<{}> {
  lastPrice?: number;

  constructor() {
    super(process.env.ETH_PRICE_USD);
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
    return `${updown}${formatCents(Math.abs(this.lastPrice - price))}`;
  }

  async update({ ethUsdPrice }: { ethUsdPrice: number }) {
    const price = ethUsdPrice;
    const momentum = this.getMomentum(price);

    this.setNickname(`$${formatCents(price)} ${momentum}`);
    this.setStatus("USD per ETH");

    this.lastPrice = price;
  }
}

export default EthPriceUsd;

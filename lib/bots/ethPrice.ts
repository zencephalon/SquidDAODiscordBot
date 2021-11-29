import Bot from "./bot";

import { formatCents } from "./utils/format";

class EthPrice extends Bot {
  lastPrice?: number;

  constructor() {
    super(process.env.ETH_PRICE_TOKEN);
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

    console.log({
      lastPrice: this.lastPrice,
      price: price,
    });

    this.lastPrice = price;
  }
}

export default EthPrice;

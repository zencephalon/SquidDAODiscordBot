import Bot from "./bot";

import { formatDollars } from "./utils/format";

class SquidMcUsd extends Bot<{}> {
  lastMc?: number;

  constructor() {
    super(process.env.SQUID_MC_USD);
    this.lastMc = undefined;
  }

  getMomentum(mc: number) {
    if (!this.lastMc) {
      return "→";
    }
    if (this.lastMc == mc) {
      return "→";
    }

    const updown = this.lastMc < mc ? "↗" : "↘";
    return `${updown}${formatDollars(Math.abs(this.lastMc - mc))}`;
  }

  async update({
    squidEthPrice,
    squidSupply,
    ethUsdPrice,
  }: {
    squidEthPrice: number;
    squidSupply: number;
    ethUsdPrice: number;
  }) {
    const mc = squidEthPrice * squidSupply * ethUsdPrice;
    const momentum = this.getMomentum(mc);

    this.setNickname(`\$${formatDollars(mc)} ${momentum}`);
    this.setStatus("Market Cap in USD");

    this.lastMc = mc;
  }
}

export default SquidMcUsd;

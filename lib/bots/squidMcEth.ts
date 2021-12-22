import Bot from "./bot";

import { formatEth } from "./utils/format";

class SquidMcEth extends Bot<{}> {
  lastMc?: number;

  constructor() {
    super(process.env.SQUID_MC_ETH);
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
    return `${updown}${formatEth(Math.abs(this.lastMc - mc))}`;
  }

  async update({
    squidEthPrice,
    squidSupply,
  }: {
    squidEthPrice: number;
    squidSupply: number;
  }) {
    const mc = squidEthPrice * squidSupply;
    const momentum = this.getMomentum(mc);

    this.setNickname(`Ξ${formatEth(mc)} ${momentum}`);
    this.setStatus("Market Cap in ETH");

    this.lastMc = mc;
  }
}

export default SquidMcEth;

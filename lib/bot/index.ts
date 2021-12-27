import Bot from "./bot";
export { tick, refreshDisplay } from "./bot";
export type { Bot };

import EthPriceUsd from "./ethPriceUsd";
import SquidPrice from "./squidPrice";
import SquidMc from "./squidMc";
import SquidStaked from "./squidStaked";
import SquidLp from "./squidLp";
// import SquidIndex from "./squidIndex";

export const bots = [
  new EthPriceUsd(),
  new SquidPrice(),
  new SquidMc(),
  new SquidStaked(),
  new SquidLp(),
  // new SquidIndex(),
];

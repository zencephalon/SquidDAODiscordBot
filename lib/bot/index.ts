import Bot from "./bot";
export type { Bot };

import EthPriceUsd from "./ethPriceUsd";
import SquidPrice from "./squidPrice";
import SquidMc from "./squidMc";
import SquidStaked from "./squidStaked";

export const bots = [
  new EthPriceUsd(),
  new SquidPrice(),
  new SquidMc(),
  new SquidStaked(),
];

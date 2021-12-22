import Bot from "./bot";
export type { Bot };

import EthPriceUsd from "./ethPriceUsd";
import SquidPrice from "./squidPrice";
import SquidMcEth from "./squidMcEth";
import SquidMcUsd from "./squidMcUsd";

export const bots = [
  new EthPriceUsd(),
  new SquidPrice(),
  new SquidMcEth(),
  new SquidMcUsd(),
];

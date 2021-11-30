import Bot from "./bot";
export type { Bot };

import EthPriceUsd from "./ethPriceUsd";
import SquidPriceEth from "./squidPriceEth";
import SquidPriceUsd from "./squidPriceUsd";
import SquidMcEth from "./squidMcEth";
import SquidMcUsd from "./squidMcUsd";

export const bots = [
  new EthPriceUsd(),
  new SquidPriceEth(),
  new SquidPriceUsd(),
  new SquidMcEth(),
  new SquidMcUsd(),
];

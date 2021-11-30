import Bot from "./bot";
export type { Bot };

import SquidPriceEth from "./squidPriceEth";
import SquidPriceUsd from "./squidPriceUsd";
import EthPriceUsd from "./ethPriceUsd";

export const bots = [
  new SquidPriceEth(),
  new SquidPriceUsd(),
  new EthPriceUsd(),
];

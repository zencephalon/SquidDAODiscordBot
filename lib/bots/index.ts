import Bot from "./bot";
export type { Bot };

import SquidPriceBot from "./squidPrice";
import EthPriceBot from "./ethPrice";

export const bots = [new SquidPriceBot(), new EthPriceBot()];

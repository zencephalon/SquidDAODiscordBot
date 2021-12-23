import Bot, { BotInputs } from "./bot";

import { formatCentsMomentum } from "./util/format";

interface Outputs {
  usdPrice: number;
}

const compute = (inputs: BotInputs): Outputs => {
  return {
    usdPrice: inputs.ethUsdPrice,
  };
};

const display = (lastOutputs: Outputs, outputs: Outputs) => {
  return formatCentsMomentum(lastOutputs.usdPrice, outputs.usdPrice);
};

const displays = [
  {
    label: "USD per ETH",
    getDisplay: display,
  },
];

class EthPriceUsd extends Bot<Outputs> {
  constructor() {
    super(process.env.ETH_PRICE_USD, compute, displays);
  }
}

export default EthPriceUsd;

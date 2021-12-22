import Bot, { BotInputs } from "./bot";
import { formatUsdMomentum, formatEthMomentum } from "./utils/format";

interface Outputs {
  usdPrice: number;
  ethPrice: number;
}

const usdPriceDisplay = (lastOutputs: Outputs, outputs: Outputs) => {
  const s = formatUsdMomentum(lastOutputs.usdPrice, outputs.usdPrice);
  return `🦑= ${s}`;
};

const ethPriceDisplay = (lastOutputs: Outputs, outputs: Outputs) => {
  const s = formatEthMomentum(lastOutputs.ethPrice, outputs.ethPrice);
  return `🦑= ${s}`;
};

const compute = (inputs: BotInputs): Outputs => {
  return {
    ethPrice: inputs.squidEthPrice,
    usdPrice: inputs.ethUsdPrice * inputs.squidEthPrice,
  };
};

const displays = [
  {
    label: "USD per Squid",
    getDisplay: usdPriceDisplay,
  },
  {
    label: "ETH per Squid",
    getDisplay: ethPriceDisplay,
  },
];

class SquidPrice extends Bot<Outputs> {
  constructor() {
    super(process.env.SQUID_PRICE, compute, displays);
  }
}

export default SquidPrice;

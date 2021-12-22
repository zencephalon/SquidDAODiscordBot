import Bot, { BotInputs } from "./bot";
import { formatDollars, formatEth, formatMomentum } from "./utils/format";

interface Outputs {
  usdPrice: number;
  ethPrice: number;
}

const usdPriceDisplay = (lastOutputs: Outputs, outputs: Outputs) => {
  const momentum = formatMomentum(
    formatDollars,
    lastOutputs.usdPrice,
    outputs.usdPrice
  );
  return `🦑= \$${formatDollars(outputs.usdPrice)} ${momentum}`;
};

const ethPriceDisplay = (lastOutputs: Outputs, outputs: Outputs) => {
  const momentum = formatMomentum(
    formatEth,
    lastOutputs.ethPrice,
    outputs.ethPrice
  );
  return `🦑= Ξ${formatEth(outputs.ethPrice)} ${momentum}`;
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

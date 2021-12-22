import Bot, { BotInputs } from "./bot";
import { formatUsdMomentum, formatEthMomentum } from "./utils/format";

interface Outputs {
  usdMc: number;
  ethMc: number;
}

const compute = (inputs: BotInputs): Outputs => {
  return {
    usdMc: inputs.squidEthPrice * inputs.squidSupply * inputs.ethUsdPrice,
    ethMc: inputs.squidEthPrice * inputs.squidSupply,
  };
};

const usdPriceDisplay = (lastOutputs: Outputs, outputs: Outputs) => {
  const s = formatUsdMomentum(lastOutputs.usdMc, outputs.usdMc);
  return `MC= ${s}`;
};

const ethPriceDisplay = (lastOutputs: Outputs, outputs: Outputs) => {
  const s = formatEthMomentum(lastOutputs.ethMc, outputs.ethMc);
  return `MC= ${s}`;
};

const displays = [
  {
    label: "USD Market Cap",
    getDisplay: usdPriceDisplay,
  },
  {
    label: "ETH Market Cap",
    getDisplay: ethPriceDisplay,
  },
];

class SquidMc extends Bot<Outputs> {
  constructor() {
    super(process.env.SQUID_MC, compute, displays);
  }
}

export default SquidMc;

import Bot, { BotInputs } from "./bot";
import { formatEth, formatWhole } from "./util/format";

interface Outputs {
  sSquidIndex: number;
}

const compute = (inputs: BotInputs): Outputs => {
  return {
    sSquidIndex: inputs.sSquidIndex,
  };
};

const displayFraction = (lastOutputs: Outputs, outputs: Outputs) => {
  return `ws🦑= ${formatEth(outputs.sSquidIndex)} sSquid`;
};

const displays = [
  {
    label: "wsSquid to sSquid index",
    getDisplay: displayFraction,
  },
];

class SquidStaked extends Bot<Outputs> {
  constructor() {
    super(process.env.ETH_PRICE_USD, compute, displays);
  }
}

export default SquidStaked;

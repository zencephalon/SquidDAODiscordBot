import Bot, { BotInputs } from "./bot";
import { formatEth, formatWhole } from "./util/format";

interface Outputs {
  lpSquidSupply: number;
  squidSupply: number;
}

const compute = (inputs: BotInputs): Outputs => {
  return {
    lpSquidSupply: inputs.lpSquidSupply,
    squidSupply: inputs.squidSupply,
  };
};

const displayFraction = (lastOutputs: Outputs, outputs: Outputs) => {
  return `🦑LP: ${formatWhole(outputs.lpSquidSupply)}/${formatWhole(
    outputs.squidSupply
  )}`;
};

const displayPercentage = (lastOutputs: Outputs, outputs: Outputs) => {
  return `🦑LP: ${formatEth(
    (outputs.lpSquidSupply / outputs.squidSupply) * 100
  )}%`;
};

const displays = [
  {
    label: "Squid in LP / Squid",
    getDisplay: displayFraction,
  },
  {
    label: "Squid in LP / Squid",
    getDisplay: displayPercentage,
  },
];

class SquidStaked extends Bot<Outputs> {
  constructor() {
    super(process.env.SQUID_LP, compute, displays);
  }
}

export default SquidStaked;

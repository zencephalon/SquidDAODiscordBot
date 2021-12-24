import Bot, { BotInputs } from "./bot";
import { formatEth, formatWhole } from "./util/format";

interface Outputs {
  sSquidSupply: number;
  squidSupply: number;
}

const compute = (inputs: BotInputs): Outputs => {
  return {
    sSquidSupply: inputs.sSquidSupply,
    squidSupply: inputs.squidSupply,
  };
};

const displayFraction = (lastOutputs: Outputs, outputs: Outputs) => {
  return `s🦑: ${formatWhole(outputs.sSquidSupply)}/${formatWhole(
    outputs.squidSupply
  )}`;
};

const displayPercentage = (lastOutputs: Outputs, outputs: Outputs) => {
  return `s🦑: ${formatEth(
    (outputs.sSquidSupply / outputs.squidSupply) * 100
  )}%`;
};

const displays = [
  {
    label: "sSquid / Squid",
    getDisplay: displayFraction,
  },
  {
    label: "sSquid / Squid",
    getDisplay: displayPercentage,
  },
];

class SquidStaked extends Bot<Outputs> {
  constructor() {
    super(process.env.SQUID_STAKED, compute, displays);
  }
}

export default SquidStaked;

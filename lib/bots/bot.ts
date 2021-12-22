import { Client, Intents } from "discord.js";

export interface BotInputs {
  squidEthPrice: number;
  ethUsdPrice: number;
  squidSupply: number;
}

interface Display<Outputs> {
  label: string;
  getDisplay: (lastOutputs: Outputs, outputs: Outputs) => string;
}

class Bot<Outputs> {
  client: Client;
  token?: string;
  displays?: Display<Outputs>[];
  inputs?: BotInputs;
  displayIndex = 0;
  outputs?: Outputs;
  lastOutputs?: Outputs;
  compute?: (inputs: BotInputs) => Outputs;

  constructor(
    token?: string,
    compute?: (input: BotInputs) => Outputs,
    displays?: Display<Outputs>[]
  ) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.token = token;
    this.client.on("debug", console.log);
    this.displays = displays;
    this.compute = compute;
  }

  async init() {
    return this.client.login(this.token);
  }

  async update(inputs: BotInputs) {
    this.lastOutputs = this.outputs;
    this.inputs = inputs;
    this.outputs = this.compute?.(inputs);
  }

  async refreshDisplay() {
    if (!this.displays || !this.lastOutputs || !this.outputs) {
      return;
    }
    const displayNum = this.displays.length;
    const display = this.displays[this.displayIndex];

    this.setNickname(display.getDisplay(this.lastOutputs, this.outputs));
    this.setStatus(display.label);

    this.displayIndex = (this.displayIndex + 1) % displayNum;
  }

  async setNickname(name: string) {
    const guilds = await this.client.guilds.cache;
    await Promise.all(
      guilds.map(async (guild) => {
        const g = await guild.fetch();
        g.me?.setNickname(name);
      })
    );
  }

  async setStatus(status: string) {
    await this.client.user?.setPresence({
      activities: [
        {
          name: status,
          type: 1,
        },
      ],
      status: "online",
    });
  }
}

export default Bot;

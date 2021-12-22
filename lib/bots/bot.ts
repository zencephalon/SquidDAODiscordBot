import { Client, Intents } from "discord.js";

export interface BotInputs {
  squidEthPrice: number;
  ethUsdPrice: number;
  squidSupply: number;
}

interface Display {
  label: string;
  getDisplay: (input?: BotInputs) => string;
}

class Bot {
  client: Client;
  token?: string;
  displays?: Display[];
  inputs?: BotInputs;
  displayIndex = 0;

  constructor(token?: string, displays?: Display[]) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.token = token;
    this.client.on("debug", console.log);
    this.displays = displays;
  }

  async init() {
    return this.client.login(this.token);
  }

  async update(inputs: BotInputs) {
    this.inputs = inputs;
  }

  async refreshDisplay() {
    if (!this.displays) {
      return;
    }
    const displayNum = this.displays.length;
    const display = this.displays[this.displayIndex];

    this.setNickname(display.getDisplay(this.inputs));
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

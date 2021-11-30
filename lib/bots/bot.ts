import { Client, Intents } from "discord.js";

class Bot {
  client: Client;
  token?: string;

  constructor(token?: string, label?: string) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.token = token;
    this.client.on("debug", console.log);
  }

  async init() {
    return this.client.login(this.token);
  }

  async update(data: any) {}

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

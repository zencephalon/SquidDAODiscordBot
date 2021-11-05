// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";

// Create a new client instance

// When the client is ready, run this code (only once)

// Login to Discord with your client's token

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  client.once("ready", () => {
    console.log("Ready!");
  });
  await client.login(process.env.DISCORD_TOKEN);
  const guilds = await client.guilds.fetch();

  await Promise.all([
    guilds.map(async (guild) => {
      const g = await guild.fetch();
      g.me?.setNickname("ILUVU frens!");
    }),
  ]);

  // message.guild.members.get(bot.user.id).setNickname("some nickname");

  res.status(200).json({ name: "John Doe" });
}

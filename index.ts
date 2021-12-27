require("dotenv").config();

import { bots, tick, refreshDisplay } from "./lib/bot";

async function go() {
  await Promise.all(bots.map((bot) => bot.init()));

  await tick(bots);
  await tick(bots);
  refreshDisplay(bots);
  setInterval(() => tick(bots), 1000 * 120);
  setInterval(() => refreshDisplay(bots), 1000 * 30);
}

go();

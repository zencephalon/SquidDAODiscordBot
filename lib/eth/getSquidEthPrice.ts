import { Contract } from "@ethersproject/contracts";

import sushi from "./abi/sushi";
import provider from "./provider";

const SQUID_WETH_PAIR = "0xfad704847967d9067df7a60910399155fca43fe8";
const squidWethSushiswap = new Contract(SQUID_WETH_PAIR, sushi, provider);

async function getSquidEthPrice() {
  const [r0, r1] = await squidWethSushiswap.functions["getReserves"]();

  const price = r1 / r0 / 1e9;
  return price;
}

export default getSquidEthPrice;

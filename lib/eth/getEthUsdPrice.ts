import { Contract } from "@ethersproject/contracts";

import sushi from "./abi/sushi";
import provider from "./provider";

const USDC_WETH_PAIR = "0x397ff1542f962076d0bfe58ea045ffa2d347aca0";
const usdcWethSushiswap = new Contract(USDC_WETH_PAIR, sushi, provider);

async function getEthUsdPrice() {
  const [r0, r1] = await usdcWethSushiswap.functions["getReserves"]();

  const price = r0 / r1.div(1e12);
  return price;
}

export default getEthUsdPrice;

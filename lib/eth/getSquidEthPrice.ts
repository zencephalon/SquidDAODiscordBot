import { squidWethSushiswap } from "./contract";

async function getSquidEthPrice() {
  const [r0, r1] = await squidWethSushiswap.functions["getReserves"]();

  const price = r1 / r0 / 1e9;
  return price;
}

export default getSquidEthPrice;

import { squidWethSushiswap } from "./contract";

async function getSquidEthReserves() {
  const [r0, r1] = await squidWethSushiswap.functions["getReserves"]();

  return [r0, r1];
}

export default getSquidEthReserves;

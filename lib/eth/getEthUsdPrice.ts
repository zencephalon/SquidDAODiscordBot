import { usdcWethSushiswap } from "./contract";

async function getEthUsdPrice() {
  const [r0, r1] = await usdcWethSushiswap.functions["getReserves"]();

  const price = r0 / r1.div(1e12);
  return price;
}

export default getEthUsdPrice;

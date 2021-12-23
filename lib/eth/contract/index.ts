import { Contract } from "@ethersproject/contracts";
import provider from "./provider";

import squidAbi from "./abi/squid";
import sSquidAbi from "./abi/sSquid";
import sushiAbi from "./abi/sushi";

const SQUID_TOKEN = "0x21ad647b8F4Fe333212e735bfC1F36B4941E6Ad2";
export const squidToken = new Contract(SQUID_TOKEN, squidAbi, provider);

const S_SQUID_TOKEN = "0x9d49bfc921f36448234b0efa67b5f91b3c691515";
export const sSquidToken = new Contract(S_SQUID_TOKEN, sSquidAbi, provider);

const SQUID_WETH_PAIR = "0xfad704847967d9067df7a60910399155fca43fe8";
export const squidWethSushiswap = new Contract(
  SQUID_WETH_PAIR,
  sushiAbi,
  provider
);

const USDC_WETH_PAIR = "0x397ff1542f962076d0bfe58ea045ffa2d347aca0";
export const usdcWethSushiswap = new Contract(
  USDC_WETH_PAIR,
  sushiAbi,
  provider
);

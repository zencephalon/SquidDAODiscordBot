import { Contract } from "@ethersproject/contracts";

import squidAbi from "./abi/squid";
import provider from "./provider";

const SQUID_TOKEN = "0x21ad647b8F4Fe333212e735bfC1F36B4941E6Ad2";
const squidToken = new Contract(SQUID_TOKEN, squidAbi, provider);

async function getSquidEthPrice() {
  const [s] = await squidToken.functions["totalSupply"]();

  const supply = s / 1e9;
  return supply;
}

export default getSquidEthPrice;

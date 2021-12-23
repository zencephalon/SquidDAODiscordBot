import { squidToken } from "./contract";

async function getSquidSupply() {
  const [s] = await squidToken.functions["totalSupply"]();

  const supply = s / 1e9;
  return supply;
}

export default getSquidSupply;

import { sSquidToken } from "./contract";

async function getSSquidSupply() {
  const [s] = await sSquidToken.functions["circulatingSupply"]();

  const supply = s / 1e9;
  return supply;
}

export default getSSquidSupply;

import { sSquidToken } from "./contract";

async function getSSquidIndex() {
  const [i] = await sSquidToken.functions["index"]();

  const index = i / 1e9;
  return index;
}

export default getSSquidIndex;

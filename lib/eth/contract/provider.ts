import { ethers } from "ethers";

export const provider = new ethers.providers.InfuraProvider(
  1,
  process.env.INFURA_PROJECT
);

export default provider;

import { getContract } from "viem";
import abi from "./simpleMMMM_ABI.json";
import { getPublicClient, getWalletClient } from "../web3AuthUtils";

const contractAddress = "0xd11fb0512728fae94d69890ce916d9ead9907d71";

const walletClient = getWalletClient();
const publicClient = getPublicClient();

export const simpleMMMM_contract = getContract({
  abi,
  address: contractAddress,
  client: publicClient,
});

export const simpleMMMM_contractWithSigner = getContract({
  abi,
  address: contractAddress,
  client: walletClient,
});

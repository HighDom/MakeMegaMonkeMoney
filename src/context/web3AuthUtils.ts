"use client";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { get } from "http";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { mainnet, sepolia } from "viem/chains";
import {smartContractDestinationAddress} from "./config";

const clientId =
  "BKhaGjPQk7yRYG2eTz_GXAoU72kUvj1PBg4wMyBkav5xpSoUoi57HNssKwwWlVd4Q6WT06Wl8n45gK_PUzzqPOM";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

// const web3auth = new Web3Auth({
//   clientId,
//   web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
//   privateKeyProvider,
// });

const publicClient = createPublicClient({
  chain: sepolia, // FIXME: use the correct chain
  transport: http("https://rpc.sepolia.org"), //FIXME: No clue what this transport is
});

const walletClient = createWalletClient({
  chain: sepolia, // FIXME: use the correct chain
  transport: http("https://rpc.sepolia.org"), //FIXME: No clue what this transport is
});


let web3authInstance: Web3Auth | null = null;

export const getWeb3AuthInstance = (): Web3Auth => {
  if (!web3authInstance) {
    web3authInstance = new Web3Auth({
      clientId,
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
      privateKeyProvider,
    });
  }
  return web3authInstance;
};

export const getPublicClient = () => {
  return publicClient;
};

export const getWalletClient = () => {
  return walletClient;
};

export const getWalletAddresses = async () => {
  const address = await walletClient.getAddresses();
  return address;
}


export const signTransactionTest = async () => {
  // data for the transaction
  const destination = smartContractDestinationAddress;
  const amount = parseEther("0.00001");

  const address = await walletClient.getAddresses();

  // Prepare transaction
  const request = await walletClient.prepareTransactionRequest({
    account: address[0],
    to: destination,
    value: amount,
  });

  // Sign transaction
  const signature = await walletClient.signTransaction(request as any);

  // Submit transaction to the blockchain
  const hash = await walletClient.sendRawTransaction(signature as any);
}


export default { getWeb3AuthInstance , getPublicClient, getWalletClient, getWalletAddresses };
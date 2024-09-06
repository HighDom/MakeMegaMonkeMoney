"use client";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { createPublicClient, createWalletClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

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

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

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

export default { getWeb3AuthInstance ,web3auth, publicClient, walletClient };
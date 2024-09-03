"use client";

import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";

import RPC from "./ethersRPC";
import { createContext, useContext, useEffect, useState } from "react";

// import RPC from "./viemRPC";
// import RPC from "./web3RPC";

// export const metadata: Metadata = {
//   title: "MakeMegaMonkeMoney metaData",
//   description: "This is Next.js Home",
// };

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
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

import { ReactNode } from "react";

const Web3AuthContext = createContext({
  loggedIn: false,
  login: async () => {},
  logout: async () => {},
  getUserInfo: async () => {},
  getUserName: async () => {
    return "test";
  },
  getAccounts: async () => {},
  getBalance: async () => {},
  signMessage: async () => {},
  sendTransaction: async () => {},
  userName: "Not Initialized",
  userAccount: "Not Initialized",
  userProfile: "Not Initialized",
  userBalance: "Not Initialized",
});

const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("Default Username");
  const [userAccount, setUserAccount] = useState<string>("Default Account");
  const [userProfile, setUserProfile] = useState<string>("Default Image");
  const [userBalance, setUserBalance] = useState<string>("Default Balance");

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);
      await getUserInfo();
      await getAccounts();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      if (!web3auth.connected) {
        setLoggedIn(false);
      }
      uiConsole("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async (): Promise<void> => {
    const user = await web3auth.getUserInfo();

    if (user.name) {
      console.log("user.name", user.name);
      setUserName(user.name);
    }
    if (user.profileImage) {
      console.log("user.profileImage", user.profileImage);
      setUserProfile(user.profileImage);
    }

    console.log("user", user);
    uiConsole(user);
  };

  const getUserName = async () => {
    const username = await web3auth.getUserInfo.name;
    console.log("username", username);
    uiConsole(username);
    return username;
  };

  // Check the RPC file for the implementation
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    setUserAccount(address);
    uiConsole(address);
    return address;
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    setUserBalance(balance);
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  return (
    <Web3AuthContext.Provider
      value={{
        loggedIn,
        login,
        logout,
        getUserInfo,
        getUserName,
        getAccounts,
        getBalance,
        signMessage,
        sendTransaction,
        userName,
        userAccount,
        userProfile,
        userBalance,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export default Web3AuthProvider;

export const useWeb3Auth = () => useContext(Web3AuthContext);

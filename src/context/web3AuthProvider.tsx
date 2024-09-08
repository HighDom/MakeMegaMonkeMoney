"use client";

import { ReactNode } from "react";

// import RPC from "./ethersRPC";
import { useEffect, useState } from "react";
import Web3AuthContext from "./web3AuthContext";
import { IProvider } from "@web3auth/base";
import {
  getWeb3AuthInstance,
  getWalletClient,
  getPublicClient,
  getWalletAddresses,
} from "./web3AuthUtils";
import RPC from "./ethersRPC";
import { smartContractDestinationAddress } from "./config";
import { parseEther } from "viem";

const walletClient = getWalletClient();
const publicClient = getPublicClient();
const web3auth = getWeb3AuthInstance();
const walletAddress = getWalletAddresses();

const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("Default Username");
  const [userAccount, setUserAccount] = useState<string>("Default Account");
  const [userProfile, setUserProfile] = useState<string>("Default Image");
  const [userBalance, setUserBalance] = useState<string>("Default Balance");
  const [gameHash, setGameHash] = useState<string>("Default Game Hash");
  const [betAmountExample, setBetAmountExample] = useState<string>("0.322 ETH");

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          console.log("Connected");
          setLoggedIn(true);
          await getUserInfo();
          await getAccounts();
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

  //NOTE: Got these transactions from Web3Auth, not sure what they do
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

  const sendTransactionTest = async () => {
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
  };

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
        setGameHash,
        setBetAmountExample,
        userName,
        userAccount,
        userProfile,
        userBalance,
        provider,
        gameHash,
        betAmountExample,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export default Web3AuthProvider;

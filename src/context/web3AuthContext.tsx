"use client";
import { createContext } from "react";
import { IProvider } from "@web3auth/base";

interface Web3AuthContextType {
  loggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  getUserName: () => Promise<string>;
  getAccounts: () => Promise<void>;
  getBalance: () => Promise<void>;
  signMessage: () => Promise<void>;
  sendTransaction: () => Promise<void>;
  setGameHash: (gameHash: string) => void;
  userName: string;
  userAccount: string;
  userProfile: string;
  userBalance: string;
  provider: IProvider | null; // Fixing the provider type here
  gameHash: string;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
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
  setGameHash: (gameHash: string) => {},
  userName: "Not Initialized",
  userAccount: "Not Initialized",
  userProfile: "Not Initialized",
  userBalance: "Not Initialized",
  provider: null,
  gameHash: "Not Initialized",
});

export default Web3AuthContext;

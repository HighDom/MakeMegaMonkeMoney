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
  userName: string;
  userAccount: string;
  userProfile: string;
  userBalance: string;
  provider: IProvider | null; // Fixing the provider type here
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
  userName: "Not Initialized",
  userAccount: "Not Initialized",
  userProfile: "Not Initialized",
  userBalance: "Not Initialized",
  provider: null,
});

export default Web3AuthContext;

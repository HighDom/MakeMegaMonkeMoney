"use client";
import { createContext } from "react";

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

export default Web3AuthContext;

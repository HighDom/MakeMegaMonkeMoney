import { ethers } from "ethers";
import { IProvider } from "@web3auth/base";
import { smartContractDestinationAddress } from "./config";

import contractABI from "./contractABI.json";


const getContract = async (provider: IProvider) => {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    return new ethers.Contract(smartContractDestinationAddress, contractABI, signer);
  };


export const startBet = async (provider: IProvider, playerData: string, id: string) => {
  try {
    const contract = await getContract(provider);
    const tx = await contract.startBet(id, playerData, { value: ethers.parseEther("0.1") });
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error starting bet:", error);
    throw error;
  }
};

export const joinBet = async (provider: IProvider, id: string) => {
  try {
    const contract = await getContract(provider);
    const tx = await contract.joinBet(id, { value: ethers.parseEther("0.1") });
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error joining bet:", error);
    throw error;
  }
};

export const refundBet = async (provider: IProvider, id: string) => {
  try {
    const contract = await getContract(provider);
    const tx = await contract.refundBet(id);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error refunding bet:", error);
    throw error;
  }
};

export const determineWinner = async (provider: IProvider, id: string) => {
  try {
    const contract = await getContract(provider);
    const tx = await contract.determineWinner(id);
    await tx.wait();
    
    // Sleep for a few seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Fetch the winner
    const winner = await contract.getWinner(id);
    return winner;
  } catch (error) {
    console.error("Error determining winner:", error);
    throw error;
  }
};
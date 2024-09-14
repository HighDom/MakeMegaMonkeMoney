"use client";

import {
  simpleMMMM_contractWithSigner,
  simpleMMMM_contract,
} from "@/context/simpleMMMM_contract/simpleMMMM";
import { useWeb3Auth } from "@/context/useWeb3Auth";
import Link from "next/link";
import { useState } from "react";
import { parseEther } from "viem";

const DepositMoney = () => {
  const { loggedIn } = useWeb3Auth();
  const [amount, setAmount] = useState("");

  const handleClick = async () => {
    console.log("Deposit Money");

    if (!amount) {
      console.log("Amount is required");
      return;
    }

    try {
      const amountInWei = parseEther(amount);
      console.log("Amount in Wei:", amountInWei);

      const txHash = await simpleMMMM_contractWithSigner.write.deposit([], {
        value: amountInWei,
      });

      console.log("Transaction Hash:", txHash);
      alert("Deposit successful!");
    } catch (error) {
      console.log("Transaction Error:", error);
      return;
    }
  };

  return (
    <div>
      <p>
        Deposit funds to your account to start playing games and placing bets.
      </p>
      <div className="mt-10 flex h-20 flex-row gap-5">
        <input
          type="my-Input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Add amount USDC"
          className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />

        <button
          onClick={handleClick}
          disabled={!loggedIn}
          className="mt-5 inline-block w-50 rounded-lg bg-primary px-10 py-4 text-center font-medium text-white transition-all duration-300 hover:bg-opacity-90 dark:bg-primary dark:text-white dark:hover:bg-opacity-80"
        >
          Deposit Money
        </button>
      </div>
    </div>
  );
};

export default DepositMoney;

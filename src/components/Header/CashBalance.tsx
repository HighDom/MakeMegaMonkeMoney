import { useWeb3Auth } from "@/context/web3AuthContext";
import Link from "next/link";
import React from "react";

interface CashBalanceProps {
  userBalance: string;
}

const CashBalance = ({ userBalance }: CashBalanceProps) => {
  return (
    <div className="flex flex-col items-center rounded-md px-2 py-2 text-center hover:bg-slate-100">
      <Link
        className="text-md font-bold text-green-500 dark:text-green-500"
        href={"/deposit"}
      >
        {userBalance !== "Default Balance" ? userBalance + " $" : "0.00" + " $"}
      </Link>
    </div>
  );
};

export default CashBalance;

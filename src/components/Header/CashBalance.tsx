import Link from "next/link";
import React from "react";

interface ConstBalanceProp {
  balance: number;
}

const CashBalance: React.FC<ConstBalanceProp> = ({ balance }) => {
  return (
    <div className="flex flex-col items-center rounded-md px-2 py-2 text-center hover:bg-slate-100">
      <Link
        className="text-md font-bold text-green-500 dark:text-green-500"
        href={"/bet"}
      >
        {balance ? balance + " $" : "0.00" + " $"}
      </Link>
    </div>
  );
};

export default CashBalance;

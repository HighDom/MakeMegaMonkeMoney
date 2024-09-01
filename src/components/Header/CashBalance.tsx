import React from "react";

interface ConstBalanceProp {
  balance: number;
}

const CashBalance: React.FC<ConstBalanceProp> = ({ balance }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm font-medium text-green-500 dark:text-green-500">
        {balance ? balance + " $" : "0.00" + " $"}
      </span>
      <span className="text-grey-100 text-sm font-medium dark:text-white">
        Cash
      </span>
    </div>
  );
};

export default CashBalance;

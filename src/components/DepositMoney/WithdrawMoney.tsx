"use client";

import Link from "next/link";

const WithdrawMoney = () => {
  return (
    <div>
      <p>Withdraw funds from your account.</p>
      <div className="mt-10 flex flex-row gap-5">
        <input
          type="number"
          placeholder="Withdraw amount in USDC"
          className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />

        <Link
          href="#"
          className="items-center justify-center rounded-2xl bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Withdraw
        </Link>
      </div>
    </div>
  );
};

export default WithdrawMoney;

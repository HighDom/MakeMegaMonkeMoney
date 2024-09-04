"use client";

import Link from "next/link";

const Bet = () => {
  return (
    <div className="h-180 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {"Create Bet"}
          </h4>
          <span className="text-sm font-medium">
            {"make your first bet here"}
          </span>
          <div className="mt-5 flex flex-row gap-5">
            <input
              type="my-Input"
              placeholder="Select Bet Size"
              className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />

            <Link
              href="#"
              className="items-center justify-center rounded-2xl bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Select Bet Size
            </Link>
          </div>
          <div className="mt-5 flex flex-row gap-5">
            <input
              type="my-Input"
              placeholder="Game"
              className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />

            <Link
              href="#"
              className="items-center justify-center rounded-2xl bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Select Game
            </Link>
          </div>
          <div className="mt-5 flex flex-row gap-5">
            <input
              type="my-Input"
              placeholder="Game Mode"
              className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />

            <Link
              href="#"
              className="items-center justify-center rounded-2xl bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Select Game Mode
            </Link>
          </div>
          <div className="mt-5 flex flex-row gap-5">
            <input
              type="my-Input"
              placeholder="Opponent ID"
              className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />

            <Link
              href="#"
              className="items-center justify-center rounded-2xl bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Opponent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bet;

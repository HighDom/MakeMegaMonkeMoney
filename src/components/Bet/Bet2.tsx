"use client";

import React, { useState, ChangeEvent, useContext } from "react";
import Link from "next/link";
import { useWeb3Auth } from "@/context/useWeb3Auth";

const regions = [
  "North America",
  "Europe",
  "Asia",
  "South America",
  "Africa",
  "Oceania",
];
const games = [
  "League of Legends",
  "Dota 2",
  "Counter-Strike: Global Offensive",
  "Valorant",
];

const gameModes: { [key: string]: string[] } = {
  "League of Legends": ["Summoner's Rift", "ARAM", "TFT"],
  "Dota 2": ["All Pick", "Captains Mode", "Turbo"],
  "Counter-Strike: Global Offensive": ["Competitive", "Casual", "Deathmatch"],
  Valorant: ["Unrated", "Competitive", "Spike Rush"],
};

const Bet: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [bettingAmountUSD, setBettingAmountUSD] = useState<string>("");
  const [bettingAmountETH, setBettingAmountETH] = useState<string>("");
  const { userName } = useWeb3Auth();

  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.target.value);
  };

  const handleBettingAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const usdAmount = e.target.value;
    setBettingAmountUSD(usdAmount);
    // Assuming 1 ETH = 3000 USD (you'd want to use a real-time exchange rate in a production app)
    const ethAmount = (parseFloat(usdAmount) / 3000).toFixed(6);
    setBettingAmountETH(ethAmount);
  };

  const PlayerInputs: React.FC<{
    playerName: string;
  }> = ({ playerName }) => (
    <div className="mt-5 space-y-4">
      <h4 className="text-title-md font-bold text-black dark:text-white">
        {playerName}
      </h4>
      <div className="flex flex-row gap-5">
        <input
          type="text"
          placeholder="In-game Name"
          className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="text"
          placeholder="Tagline"
          className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <div className="flex flex-row gap-5">
        <select className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div className="w-full">
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {"Create Bet"}
          </h4>
          <span className="text-sm font-medium">
            {"Make your first bet here"}
          </span>
          <div className="flex flex-row gap-10 rounded-2xl bg-purple-400 p-5">
            <PlayerInputs playerName={userName} />
            <PlayerInputs playerName={"Opponent"} />
          </div>

          <div className="mt-5 flex flex-row gap-5">
            <input
              type="number"
              placeholder="Bet Size (USD)"
              className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={bettingAmountUSD}
              onChange={handleBettingAmountChange}
            />
            {bettingAmountETH && (
              <span className="self-center text-sm font-medium">
                Equivalent: {bettingAmountETH} ETH
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-row gap-5">
            <select
              onChange={handleGameChange}
              className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select Game</option>
              {games.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          {selectedGame && (
            <div className="mt-5 flex flex-row gap-5">
              <select className="w-50 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="">Select Game Mode</option>
                {gameModes[selectedGame].map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="#"
              className="inline-block items-center justify-center rounded-2xl bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Create Bet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bet;

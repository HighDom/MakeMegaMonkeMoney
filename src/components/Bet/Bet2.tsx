"use client";

import React, { useState, ChangeEvent } from "react";
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
  const [selectedGameMode, setSelectedGameMode] = useState<string>("");
  const [bettingAmountUSD, setBettingAmountUSD] = useState<string>("");
  const [bettingAmountETH, setBettingAmountETH] = useState<string>("");
  const { userName } = useWeb3Auth();

  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.target.value);
    setSelectedGameMode("");
  };

  const handleGameModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGameMode(e.target.value);
  };

  const handleBettingAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const usdAmount = e.target.value;
    setBettingAmountUSD(usdAmount);
    const ethAmount = (parseFloat(usdAmount) / 3000).toFixed(6);
    setBettingAmountETH(ethAmount);
  };

  const PlayerInputs: React.FC<{
    playerName: string;
    isUser: boolean;
  }> = ({ playerName, isUser }) => (
    <div
      className={`mt-5 space-y-4 rounded-lg p-4 ${isUser ? "bg-primary text-white" : "bg-white text-black"}`}
    >
      <h4 className="text-title-md font-bold">{playerName}</h4>
      <div className="flex flex-row gap-5">
        <input
          type="text"
          placeholder="In-game Name"
          className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary focus-visible:shadow-none"
        />
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="text"
          placeholder="Tagline"
          className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary focus-visible:shadow-none"
        />
      </div>
    </div>
  );

  return (
    <div className="h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4">
        <h4 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Create Bet
        </h4>

        <div className="mb-6">
          <select
            onChange={handleGameChange}
            className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
          <div className="mb-6">
            <select
              onChange={handleGameModeChange}
              className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
            >
              <option value="">Select Game Mode</option>
              {gameModes[selectedGame].map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedGame && selectedGameMode && (
          <div className="bg-gray-100 mb-6 rounded-lg p-4">
            <h5 className="mb-2 text-lg font-semibold">Game Details</h5>
            <p>
              <strong>Game:</strong> {selectedGame}
            </p>
            <p>
              <strong>Mode:</strong> {selectedGameMode}
            </p>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-6 md:flex-row">
          <PlayerInputs playerName={userName} isUser={true} />
          <PlayerInputs playerName="Opponent" isUser={false} />
        </div>

        <div className="mb-6">
          <select className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white">
            <option value="">Select Location</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex flex-row items-center gap-5">
          <input
            type="number"
            placeholder="Bet Size (USD)"
            className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
            value={bettingAmountUSD}
            onChange={handleBettingAmountChange}
          />
          {bettingAmountETH && (
            <span className="text-sm font-medium">
              Equivalent: {bettingAmountETH} ETH
            </span>
          )}
        </div>

        <div className="mt-8">
          <Link
            href="#"
            className="inline-block w-full rounded-lg bg-primary px-10 py-4 text-center font-medium text-white transition-all duration-300 hover:bg-opacity-90"
          >
            Create Bet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bet;

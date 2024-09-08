"use client";

import React, { useState, useEffect } from "react";
import { useWeb3Auth } from "@/context/useWeb3Auth";

interface Bet {
  id: string;
  game: string;
  gameMode: string;
  betAmount: string;
  opponent: string;
  region: string;
  status: "active" | "won" | "lost";
}

const ActiveBets: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const { userName } = useWeb3Auth();

  useEffect(() => {
    // Simulating fetching bets from a smart contract
    const fetchBets = async () => {
      // In a real implementation, you would interact with your smart contract here
      const mockBets: Bet[] = [
        {
          id: "1",
          game: "League of Legends",
          gameMode: "Summoner's Rift",
          betAmount: "0.1",
          opponent: "donutss",
          region: "North America",
          status: "active",
        },
        {
          id: "2",
          game: "Dota 2",
          gameMode: "All Pick",
          betAmount: "0.05",
          opponent: "chrissizbahy",
          region: "Europe",
          status: "won",
        },
        {
          id: "3",
          game: "Counter-Strike: Global Offensive",
          gameMode: "Competitive",
          betAmount: "0.15",
          opponent: "vitalikButerin",
          region: "Asia",
          status: "lost",
        },
      ];

      setBets(mockBets);
    };

    fetchBets();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-yellow-500";
      case "won":
        return "text-green-500";
      case "lost":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-yellow-100 border-yellow-500";
      case "won":
        return "bg-green-100 border-green-500";
      case "lost":
        return "border-black";
      default:
        return "border-gray-300";
    }
  };

  const getDarkStatusBgColor = (status: string) => {
    switch (status) {
      case "active":
        return "dark:border-yellow-300";
      case "won":
        return "dark:border-green-300";
      case "lost":
        return "dark:border-blackw";
      default:
        return "darK:border-gray-300";
    }
  };

  return (
    <div className="h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 text-2xl font-bold text-black dark:text-white">
        Active Bets
      </h4>
      <div className="flex flex-col space-y-4">
        {bets.map((bet) => (
          <div
            key={bet.id}
            className={`${getStatusColor(bet.status)} ${getStatusBgColor(bet.status)} ${getDarkStatusBgColor(bet.status)} rounded-lg border border-stroke p-4 dark:border-strokedark dark:bg-meta-4 `}
          >
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold">{bet.game}</h5>
              <span className={`font-medium ${getStatusColor(bet.status)}`}>
                {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
              </span>
            </div>
            <p>
              <strong>Mode:</strong> {bet.gameMode}
            </p>
            <p>
              <strong>Bet Amount:</strong> {bet.betAmount} ETH
            </p>
            <p>
              <strong>Opponent:</strong> {bet.opponent}
            </p>
            <p>
              <strong>Region:</strong> {bet.region}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveBets;

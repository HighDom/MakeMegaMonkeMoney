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
  gameHash: string;
}

const ActiveBets: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const { userName, gameHash } = useWeb3Auth();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    // Simulating fetching bets from a smart contract
    const fetchBets = async () => {
      // In a real implementation, you would interact with your smart contract here
      const mockBets: Bet[] = [
        {
          id: "1",
          game: "League of Legends",
          gameMode: "Most Kills",
          betAmount: "0.082",
          opponent: "donutss",
          region: "Europe",
          status: "active",
          gameHash:
            gameHash !== "Default Game Hash"
              ? truncateHash(gameHash)
              : "No active bet",
        },
        {
          id: "2",
          game: "League of Legends",
          gameMode: "Most Kills",
          betAmount: "0.082",
          opponent: "donutss",
          region: "Europe",
          status: "won",
          gameHash:
            "0x5f821c7f349b2e6a3ed476d63a0e7b1e4d87143b54a971e9cd3f8f32be17dc65",
        },
        {
          id: "3",
          game: "League of Legends",
          gameMode: "Most Kills",
          betAmount: "0.032",
          opponent: "JacobZZz",
          region: "Europe",
          status: "lost",
          gameHash:
            "0xd1714cf0e09fa665fbf0b6bbc850849efa689a1bc82ab5e21d287e67d6e56b17",
        },
        {
          id: "4",
          game: "League of Legends",
          gameMode: "Most Kills",
          betAmount: "0.012",
          opponent: "donutss",
          region: "Europe",
          status: "won",
          gameHash:
            "0x3e72f0168a5bd3f8471a3c7b69d9c8a2e79d3c61bcfa2d7a85f7a123be6f9e12",
        },
        {
          id: "5",
          game: "League of Legends",
          gameMode: "Most Kills",
          betAmount: "0.0034",
          opponent: "HyperUniverse",
          region: "Europe",
          status: "lost",
          gameHash:
            "0xb1f34e7c9852d3c176f123e8a5b76f5a93c1d52b74ea719d8e5a6cdb1b327f9a",
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
        return "dark:border-green";
      case "lost":
        return "dark:border-black";
      default:
        return "dark:border-gray-300";
    }
  };

  const truncateHash = (hash: string) => {
    if (!hash) return "";
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const copyToClipboard = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
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
            className={`${getStatusColor(bet.status)} ${getStatusBgColor(
              bet.status,
            )} ${getDarkStatusBgColor(
              bet.status,
            )} rounded-lg border border-stroke p-4 dark:border-strokedark dark:bg-meta-4 `}
          >
            <div className="flex items-center justify-between">
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
            <div className="flex items-center justify-between">
              <p>
                <strong>Game Hash:</strong> {truncateHash(bet.gameHash)}
              </p>
              <button
                onClick={() => copyToClipboard(bet.gameHash)}
                className="text-md font-bold text-primary focus:outline-none dark:text-primary"
              >
                {copiedHash === bet.gameHash ? "Copied!" : "Copy Hash"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveBets;

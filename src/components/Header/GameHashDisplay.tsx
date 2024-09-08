import { useWeb3Auth } from "@/context/useWeb3Auth";
import React, { useState } from "react";

const GameHashDisplay = () => {
  const { gameHash } = useWeb3Auth();
  const [copied, setCopied] = useState(false);

  const truncateHash = (hash: string | any[]) => {
    if (!hash) return "";
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const copyToClipboard = async () => {
    if (!gameHash) return;
    try {
      await navigator.clipboard.writeText(gameHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-md px-2 py-2 text-center hover:bg-slate-100">
      <button
        onClick={copyToClipboard}
        className="text-md font-bold text-primary focus:outline-none dark:text-primary"
      >
        Active Bet ID:{" "}
        {gameHash !== "Default Game Hash"
          ? truncateHash(gameHash)
          : "No active bet"}
      </button>
      {copied && (
        <span className="mt-1 text-sm text-green-500">
          Copied to clipboard!
        </span>
      )}
    </div>
  );
};

export default GameHashDisplay;

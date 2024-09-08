import { useWeb3Auth } from "@/context/useWeb3Auth";
import Link from "next/link";
import React from "react";

const GameHashDisplay = () => {
  const { gameHash } = useWeb3Auth();
  return (
    <div className="flex flex-col items-center rounded-md px-2 py-2 text-center hover:bg-slate-100">
      <a
        className="text-md font-bold text-primary dark:text-primary"
        href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Bet Hash: {gameHash}
      </a>
    </div>
  );
};

export default GameHashDisplay;

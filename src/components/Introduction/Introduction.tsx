"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useWeb3Auth } from "@/context/useWeb3Auth";

const Introduction: React.FC = () => {
  const router = useRouter();
  const { loggedIn } = useWeb3Auth();

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Welcome to MakeMegaMonkeMoney
      </h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What is MakeMegaMonkeMoney?</h2>
        <p>
          MakeMegaMonkeMoney is a decentralized platform that allows gamers to
          place bets on their own performance in popular esports titles.
          Currently supporting League of Legends, our platform enables you to
          challenge friends or other players to matches, with the winner taking
          the agreed-upon prize pool.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <ol className="list-inside list-decimal space-y-2">
          <li>Connect your wallet and log in</li>
          <li>Create a bet or join an existing one</li>
          <li>Play your match and we will automatically detect the winner</li>
          <li>Smart contract automatically distributes winnings</li>
        </ol>
      </section>

      {!loggedIn && (
        <div
          className="border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"
          role="alert"
        >
          <p className="font-bold">Please Note:</p>
          <p>
            You need to log in with your Web3 wallet to create or join bets.
          </p>
        </div>
      )}

      <div className="flex justify-center space-x-4 pt-4">
        <button
          onClick={() => router.push("/bet")}
          disabled={!loggedIn}
          className="w-40"
        >
          Create Bet
        </button>
        <button
          onClick={() => router.push("/joinBet")}
          disabled={!loggedIn}
          className="w-40"
        >
          Join Bet
        </button>
      </div>
    </div>
  );
};

export default Introduction;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useWeb3Auth } from "@/context/useWeb3Auth";
import { getBalance } from "viem/actions";

const Introduction: React.FC = () => {
  const router = useRouter();
  const { loggedIn, userBalance } = useWeb3Auth();

  const validUserBalance =
    !userBalance ||
    isNaN(parseFloat(userBalance)) ||
    parseFloat(userBalance) <= 0
      ? false
      : true;

  return (
    <div className=" max-w-2xl space-y-8 p-6">
      <h1 className="mb-6 text-3xl font-bold text-green-900">
        Welcome to MakeMegaMonkeMoney
      </h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-700">
          What is MakeMegaMonkeMoney?
        </h2>
        <p>
          MakeMegaMonkeMoney is a decentralized platform that allows gamers to
          place bets on their own performance in popular esports titles.
          Currently supporting League of Legends, our platform enables you to
          challenge friends or other players to matches, with the winner taking
          the agreed-upon prize pool.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-700">
          How you can Start
        </h2>
        <ol className="list-inside list-decimal space-y-2">
          <li>Connect your wallet and log in</li>
          <li>Create a bet or join an existing one</li>
          <li>Play your match and we will automatically detect the winner</li>
          <li>Smart contract automatically distributes winnings</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-700">
          How our transactions Work
        </h2>
        <p>
          We use a smart contract to create your bet. Once 2 players joined we
          will make the bet active Then we wait for your game to finish and we
          use Chainlink Oracle Functions to call LoL API to determine the bet
          outcome. As soon as our Oracles reached a consensus they will call the
          winner Function and automatically send the funds to the appropriate
          destination
        </p>
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

      {!validUserBalance && (
        <div
          className="border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"
          role="alert"
        >
          <p className="font-bold">Please Note:</p>
          <p>
            You need a balance greater than 0 to create or join bets. Please
            deposit funds
          </p>
          <button
            onClick={() => router.push("/deposit")}
            disabled={!loggedIn}
            className="mt-5 inline-block w-full rounded-lg bg-primary px-10 py-4 text-center font-medium text-white transition-all duration-300 hover:bg-opacity-90 dark:bg-primary dark:text-white dark:hover:bg-opacity-80"
          >
            Deposit Money
          </button>
        </div>
      )}

      {loggedIn && validUserBalance && (
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => router.push("/bet")}
            disabled={!loggedIn}
            className="inline-block w-full rounded-lg bg-primary px-10 py-4 text-center font-medium text-white transition-all duration-300 hover:bg-opacity-90 dark:bg-primary dark:text-white dark:hover:bg-opacity-80"
          >
            Create Bet
          </button>
          <button
            onClick={() => router.push("/joinBets")}
            disabled={!loggedIn}
            className="inline-block w-full rounded-lg bg-primary px-10 py-4 text-center font-medium text-white transition-all duration-300 hover:bg-opacity-90 dark:bg-primary dark:text-white dark:hover:bg-opacity-80"
          >
            Join Bet
          </button>
        </div>
      )}
    </div>
  );
};

export default Introduction;

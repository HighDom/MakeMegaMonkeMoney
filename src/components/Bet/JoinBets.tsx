"use client";
import React, { useState, ChangeEvent } from "react";
import { useWeb3Auth } from "@/context/useWeb3Auth";
import { useRouter } from "next/navigation";
import { joinBet } from "@/context/smartContractInteractions";
import { ethers } from "ethers";

const Bet: React.FC = () => {
  const { provider, setGameHash } = useWeb3Auth();
  const [gameHashInput, setGameHashInput] = useState<string>("");
  const [betDetails, setBetDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTransactionInProgress, setIsTransactionInProgress] =
    useState<boolean>(false);

  const router = useRouter();

  const handleGameHashChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGameHashInput(e.target.value);
  };

  const handleSearchBet = async () => {
    if (!provider || gameHashInput.length !== 66) {
      setIsError(true);
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);

      // Simulating an API call to get bet details
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // You should replace this with an actual call to fetch the bet info from your backend/smart contract.
      setBetDetails({
        game: "League of Legends",
        gameMode: "Most Kills",
        betAmount: "0.1 ETH",
        player1: "doemuderdoener#3482",
        player2: "donutts#4923",
        region: "Europe",
      });
    } catch (error) {
      console.error("Error fetching bet:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinBet = async () => {
    if (!provider || !gameHashInput) return;
    try {
      setIsLoading(true);
      setIsTransactionInProgress(true); // Show "Transaction in Progress" popup
      setGameHash(gameHashInput); // Set the gameHash in context

      // Simulate a delay for the transaction to complete
      setTimeout(() => {
        setIsTransactionInProgress(false); // Hide "Transaction in Progress" popup
        router.push("/activeBets"); // Redirect to Active Bets page
      }, 10000); // You can adjust the delay based on the actual transaction time
    } catch (error) {
      console.error("Error joining bet:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4">
        <h4 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Join a Bet
        </h4>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Game Hash"
            value={gameHashInput}
            onChange={handleGameHashChange}
            className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
        </div>

        <button
          onClick={handleSearchBet}
          className={`mb-4 w-full rounded-lg px-10 py-4 text-center font-medium transition-all duration-300 ${
            gameHashInput
              ? "bg-primary text-white hover:bg-opacity-90 dark:bg-primary dark:text-white dark:hover:bg-opacity-80"
              : "text-gray-400 border-gray-300 dark:text-gray-600 dark:border-gray-600 cursor-not-allowed border bg-white dark:bg-slate-800"
          }`}
          disabled={!gameHashInput}
        >
          {isLoading ? "Searching..." : "Search Bet"}
        </button>

        {isError && (
          <p className="text-red-500 text-center">
            Invalid game hash or error fetching bet details.
          </p>
        )}

        {betDetails && (
          <div className="bg-gray-100 mb-6 rounded-lg p-4">
            <h5 className="mb-2 text-lg font-semibold">Bet Details</h5>
            <p>
              <strong>Game:</strong> {betDetails.game}
            </p>
            <p>
              <strong>Mode:</strong> {betDetails.gameMode}
            </p>
            <p>
              <strong>Bet Amount:</strong> {betDetails.betAmount}
            </p>
            <p>
              <strong>Player 1:</strong> {betDetails.player1}
            </p>
            <p>
              <strong>Player 2:</strong> {betDetails.player2}
            </p>
            <p>
              <strong>Region:</strong> {betDetails.region}
            </p>

            <button
              onClick={handleJoinBet}
              className="mt-4 w-full rounded-lg bg-primary px-10 py-4 text-white hover:bg-opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Joining Bet..." : "Join Bet"}
            </button>
          </div>
        )}

        {isTransactionInProgress && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="scale-110 transform rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-8 shadow-2xl transition-transform duration-300 ease-out">
              <div className="rounded-lg bg-white bg-opacity-70 p-8 shadow-lg">
                <h3 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-extrabold text-transparent">
                  Transaction in Progress
                </h3>
                <p className="mb-6 text-lg">
                  Please wait while your transaction is being processed...
                </p>

                <div className="space-y-4 text-lg">
                  <p>
                    <span className="font-bold">Game: </span>League of Legends
                  </p>
                  <p>
                    <span className="font-bold">Game Mode: </span>Most Kills
                  </p>
                  <p>
                    <span className="font-bold">Bet Amount: </span>0.1 ETH
                  </p>
                  <p>
                    <span className="font-bold">Player 1: </span>
                    doemuderdoener#3482
                  </p>
                  <p>
                    <span className="font-bold">Player 2: </span>donutts#4923
                  </p>
                  <p>
                    <span className="font-bold">Region: </span>Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bet;

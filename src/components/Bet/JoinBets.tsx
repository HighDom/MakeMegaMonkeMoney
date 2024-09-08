"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWeb3Auth } from "@/context/useWeb3Auth";

import {
  startBet,
  joinBet,
  refundBet,
  determineWinner,
} from "./../../context/smartContractInteractions";

interface BetDetails {
  id: string;
  game: string;
  gameMode: string;
  region: string;
  creatorName: string;
  creatorIGN: string;
  creatorTL: string;
  betAmount: string;
}

const JoinBet: React.FC = () => {
  const [betDetails, setBetDetails] = useState<BetDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { userName, loggedIn } = useWeb3Auth();
  const router = useRouter();
  const { provider } = useWeb3Auth();

  // useEffect(() => {
  //   const { betId } = router.query;
  //   if (betId && typeof betId === "string") {
  //     fetchBetDetails(betId);
  //   }
  // }, [router.query]);

  const fetchBetDetails = async (betId: string) => {
    setIsLoading(true);
    try {
      // Replace this with actual API call
      const response: BetDetails = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              id: betId,
              game: "League of Legends",
              gameMode: "Summoner's Rift",
              region: "North America",
              creatorName: "Player1",
              creatorIGN: "Pro1",
              creatorTL: "#1234",
              betAmount: "0.1",
            }),
          1000,
        ),
      );

      setBetDetails(response);
    } catch (error) {
      console.error("Error fetching bet details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptBet = async () => {
    setIsAccepting(true);
    try {
      // Simulate accepting the bet (replace with actual logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowPopup(true);
    } catch (error) {
      console.error("Error accepting bet:", error);
    } finally {
      setIsAccepting(false);
    }
  };

  // Similar implementations for joinBet, refundBet, and determineWinner

  const handleClosePopup = () => {
    setShowPopup(false);
    router.push("/activeBets");
  };

  if (isLoading) {
    return <div className="mt-8 text-center">Loading bet details...</div>;
  }

  if (!betDetails) {
    return <div className="mt-8 text-center">Bet not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Join Bet</h1>
      <div className="rounded-lg bg-white p-6 shadow dark:bg-boxdark">
        <h2 className="mb-4 text-2xl font-semibold">Bet Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p>
              <strong>Game:</strong> {betDetails.game}
            </p>
            <p>
              <strong>Mode:</strong> {betDetails.gameMode}
            </p>
            <p>
              <strong>Region:</strong> {betDetails.region}
            </p>
            <p>
              <strong>Bet Amount:</strong> {betDetails.betAmount} ETH
            </p>
          </div>
          <div>
            <p>
              <strong>Creator:</strong> {betDetails.creatorName}
            </p>
            <p>
              <strong>Creator IGN:</strong> {betDetails.creatorIGN}
            </p>
            <p>
              <strong>Creator Tagline:</strong> {betDetails.creatorTL}
            </p>
          </div>
        </div>
        <button
          onClick={handleAcceptBet}
          disabled={isAccepting || !loggedIn}
          className={`mt-6 w-full rounded-lg px-10 py-4 text-center font-medium transition-all duration-300 ${
            loggedIn
              ? "bg-primary text-white hover:bg-opacity-90"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isAccepting ? "Accepting..." : "Accept Bet"}
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md rounded-lg bg-white p-8 dark:bg-boxdark">
            <h3 className="mb-4 text-2xl font-bold">Bet Accepted!</h3>
            <p>You have successfully joined the bet. Good luck!</p>
            <button
              onClick={handleClosePopup}
              className="mt-6 w-full rounded-lg bg-primary px-6 py-2 text-white hover:bg-opacity-90"
            >
              View Active Bets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinBet;

"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

import { useWeb3Auth } from "@/context/useWeb3Auth";
import { useRouter } from "next/navigation";
import {
  startBet,
  joinBet,
  refundBet,
  determineWinner,
} from "./../../context/smartContractInteractions";

import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";

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
  "League of Legends": ["Most Kills", "Summoner's Rift", "ARAM", "TFT"],
  "Dota 2": ["All Pick", "Captains Mode", "Turbo"],
  "Counter-Strike: Global Offensive": ["Competitive", "Casual", "Deathmatch"],
  Valorant: ["Unrated", "Competitive", "Spike Rush"],
};

const isGameActive = (game: string) => game === "League of Legends";
const isGameModeActive = (game: string, mode: string) =>
  game === "League of Legends" && mode === "Most Kills";
const isRegionActive = (region: string) => region === "Europe";

const Bet: React.FC = () => {
  const {
    provider,
    gameHash,
    setGameHash,
    setBetAmountExample,
    betAmountExample,
  } = useWeb3Auth();

  const [selectedGame, setSelectedGame] = useState<string>("");
  const [selectedGameMode, setSelectedGameMode] = useState<string>("");
  const [bettingAmountUSD, setBettingAmountUSD] = useState<string>("");
  const [bettingAmountETH, setBettingAmountETH] = useState<string>("");
  const { userName, loggedIn } = useWeb3Auth();
  const [opponentIGN, setOpponentIGN] = useState<string>("");
  const [opponentTL, setOpponentTL] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [userIGN, setUserIGN] = useState<string>("");
  const [userTL, setuserTL] = useState<string>("");

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isTransactionPending, setIsTransactionPending] =
    useState<boolean>(false); // To track the transaction state

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would interact with the smart contract
    // For now, we'll just simulate the bet creation
    console.log("Bet created:", {
      game: selectedGame,
      gameMode: selectedGameMode,
      betAmount: bettingAmountETH,
      userIGN_form: userIGN,
      userTL_form: userTL,
      opponentIGN_form: opponentIGN,
      opponentTL_form: opponentTL,
      region: selectedRegion,
    });

    // Redirect to the active bets page
  };

  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(e.target.value);
    setSelectedGameMode("");
  };

  const handleGameModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGameMode(e.target.value);
  };

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const handleBettingAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const usdAmount = e.target.value;
    setBettingAmountUSD(usdAmount);

    const ethAmount = (parseFloat(usdAmount) / 2285.14).toFixed(6);
    setBetAmountExample(ethAmount);
    setBettingAmountETH(ethAmount);
  };

  const handleStartBet = async () => {
    if (!provider) return;
    try {
      const uniqueGameHash = ethers.hashMessage(uuidv4()); //FIXME: Potentially not unique
      setGameHash(uniqueGameHash);

      const txHash = await startBet(provider, "playerData", gameHash);
      console.log("Bet started, transaction hash:", txHash);
    } catch (error) {
      console.error("Error starting bet:", error);
    }
  };

  const allFieldsFilled =
    selectedGame &&
    selectedGameMode &&
    bettingAmountETH &&
    userIGN &&
    userTL &&
    opponentIGN &&
    opponentTL &&
    selectedRegion;

  const router = useRouter();

  // const createUniqueId = () => {
  //   const uniqueHash = ethers.hashMessage(uuidv4()); //FIXME: Potentially not unique
  //   setGameHash(uniqueHash);
  // };

  const handleClick = async () => {
    handleStartBet();

    setIsTransactionPending(true);
    setIsAlertVisible(true);

    setTimeout(() => {}, 1000);

    setTimeout(() => {
      setIsTransactionPending(false);
      setIsAlertVisible(false); // Hide the alert after transaction completion

      router.push("/activeBets");
    }, 10000);

    // Here you would interact with the smart contract
    console.log("Transaction complete!");
    setIsTransactionPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark `}
      >
        <div className="mt-4">
          {isAlertVisible && (
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
                      <span className="font-bold">Game: </span>
                      {selectedGame || "League of Legends"}
                    </p>
                    <p>
                      <span className="font-bold">Game Mode: </span>
                      {selectedGameMode || "Most Kills"}
                    </p>
                    <p>
                      <span className="font-bold">Bet Amount: </span>
                      {bettingAmountETH || "0.1 ETH"} ETH
                    </p>
                    <p>
                      <span className="font-bold">Player 1: </span>
                      {userIGN || "doemuderdoener#3482"}
                    </p>
                    <p>
                      <span className="font-bold">Player 2: </span>
                      {opponentIGN || "donutts#4923"}
                    </p>
                    <p>
                      <span className="font-bold">Region: </span>
                      {selectedRegion || "Europe"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h4 className="mb-4 text-2xl font-bold text-black dark:text-white">
            Create Bet
          </h4>
          <div className={`${!loggedIn ? "pointer-events-none blur-sm" : ""}`}>
            <div className="mb-6">
              <select
                onChange={handleGameChange}
                value={selectedGame}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
              >
                <option value="">Select Game</option>
                {games.map((game) => (
                  <option
                    key={game}
                    value={game}
                    disabled={!isGameActive(game)}
                  >
                    {game} {!isGameActive(game) && "(Coming Soon)"}
                  </option>
                ))}
              </select>
            </div>

            {selectedGame && (
              <div className="mb-6">
                <select
                  onChange={handleGameModeChange}
                  value={selectedGameMode}
                  className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                >
                  <option value="">Select Game Mode</option>
                  {gameModes[selectedGame].map((mode) => (
                    <option
                      key={mode}
                      value={mode}
                      disabled={!isGameModeActive(selectedGame, mode)}
                    >
                      {mode}{" "}
                      {!isGameModeActive(selectedGame, mode) && "(Coming Soon)"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-6 gap-6 md:flex-row ">
              <div>
                <div
                  className={`mt-5 space-y-4 rounded-lg bg-primary p-4 text-white`}
                >
                  <h4 className="text-title-md font-bold">
                    {userName + " (You)"}
                  </h4>
                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      placeholder="In-game Name"
                      value={userIGN}
                      onChange={(e) => setUserIGN(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none focus:border-secondary focus-visible:shadow-none"
                    />
                  </div>
                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      placeholder="Tagline"
                      value={userTL}
                      onChange={(e) => setuserTL(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none focus:border-secondary focus-visible:shadow-none"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`mt-5 space-y-4 rounded-lg bg-secondary p-4 text-black`}
                >
                  <h4 className="text-title-md font-bold">{"Opponent"}</h4>
                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      placeholder="In-game Name"
                      onChange={(e) => setOpponentIGN(e.target.value)}
                      value={opponentIGN}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      placeholder="Tagline"
                      onChange={(e) => setOpponentTL(e.target.value)}
                      value={opponentTL}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <select
                onChange={handleRegionChange}
                value={selectedRegion}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
              >
                <option value="">Select Location</option>
                {regions.map((region) => (
                  <option
                    key={region}
                    value={region}
                    disabled={!isRegionActive(region)}
                  >
                    {region} {!isRegionActive(region) && "(Coming Soon)"}
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

            {selectedGame &&
            selectedGameMode &&
            selectedRegion &&
            userIGN &&
            userTL &&
            opponentIGN &&
            opponentTL &&
            bettingAmountETH ? (
              <div className="bg-gray-100 mb-6 rounded-lg p-4">
                <h5 className="mb-2 text-lg font-semibold">Game Details</h5>

                <p>
                  <strong>Game: </strong>
                  <span className="text-green-500">{selectedGame}</span>
                </p>

                <p>
                  <strong>Mode: </strong>
                  <span className="text-green-500">{selectedGameMode}</span>
                </p>

                <p>
                  <strong>Region: </strong>
                  <span className="text-green-500">{selectedRegion}</span>
                </p>

                <p>
                  <strong>{userName} InGameName: </strong>
                  <span className="text-green-500">{userIGN}</span>
                </p>

                <p>
                  <strong>{userName} Tag Line: </strong>
                  <span className="text-green-500">{userTL}</span>
                </p>

                <p>
                  <strong>Opponent InGameName: </strong>
                  <span className="text-green-500">{opponentIGN}</span>
                </p>

                <p>
                  <strong>Opponent Tag Line: </strong>
                  <span className="text-green-500">{opponentTL}</span>
                </p>

                <p>
                  <strong>Bet Amount: </strong>
                  <span className="text-green-500">{bettingAmountETH} ETH</span>
                </p>
              </div>
            ) : null}

            <div className="mt-8">
              <button
                type="submit"
                onClick={handleClick}
                className={`inline-block w-full rounded-lg px-10 py-4 text-center font-medium transition-all duration-300 ${
                  allFieldsFilled
                    ? "bg-primary text-white hover:bg-opacity-90 dark:bg-primary dark:text-white dark:hover:bg-opacity-80"
                    : "text-gray-400 border-gray-300 dark:text-gray-600 dark:border-gray-600 cursor-not-allowed border bg-white dark:bg-slate-800"
                }`}
                disabled={!allFieldsFilled}
              >
                Create Bet
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Bet;

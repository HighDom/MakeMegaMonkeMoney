// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

contract Betting is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    uint256 public constant FEE_PERCENT = 5;

    // Store request-related data
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    struct Player {
        address playerAddress;
        string apiKey;
        string userName;
        string tagLine;
        string region;
    }

    struct Bet {
        Player player1;
        Player player2;
        bool isActive;
        bool isFinished;
        uint256 betAmount;
        uint256 finalKillCount1;
        uint256 finalKillCount2;
    }

    mapping(bytes32 => Bet) public bets;
    bytes32[] public betIds;

    error UnexpectedRequestID(bytes32 requestId);

    event BetStarted(bytes32 indexed betId, address player1, address player2);
    event BetFinished(bytes32 indexed betId, address winner);
    event BetDraw(bytes32 indexed betId);
    event Response(bytes32 indexed requestId, string character, bytes response, bytes err);

    address router = 0xf9B8fc078197181C841c296C876945aaa425B278;
    uint32 gasLimit = 300000;
    bytes32 donID = 0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000;

    // State variable to store the returned character information
    string public character;
    mapping(address => string) public playerResults;

     string source =    "const apiKey = args[0];"
                        "const userName = args[1];"
                        "const tagLine = args[2];"
                        "const region = args[3];"
                        "const apiResponse = await Functions.makeHttpRequest({"
                        "url: `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${userName}/${tagLine}`,"
                        "params: { api_key: apiKey }"
                        "});"
                        "if (apiResponse.error) { throw Error('Request failed'); }"
                        "const puuid = apiResponse.data.puuid;"
                        "const specificDate = new Date('2024-09-03T00:00:00Z');"
                        "const timestamp = Math.floor(specificDate.getTime() / 1000);"
                        "const matchHistoryResponse = await Functions.makeHttpRequest({"
                        "url: `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,"
                        "params: { startTime: timestamp, count: 20, api_key: apiKey }"
                        "});"
                        "if (matchHistoryResponse.error) { throw Error('Failed to fetch match history'); }"
                        "const matchHistoryData = matchHistoryResponse.data;"
                        "let earliestMatchId = null;"
                        "if (matchHistoryData && matchHistoryData.length > 0) {"
                        "earliestMatchId = matchHistoryData[matchHistoryData.length - 1];"
                        "} else { throw Error('No matches found after the specified timestamp'); }"
                        "const matchDetailsResponse = await Functions.makeHttpRequest({"
                        "url: `https://${region}.api.riotgames.com/lol/match/v5/matches/${earliestMatchId}`,"
                        "params: { api_key: apiKey }"
                        "});"
                        "if (matchDetailsResponse.error) { throw Error('Failed to fetch match details'); }"
                        "const matchDetails = matchDetailsResponse.data;"
                        "let numberOfKills = 0;"
                        "for (const participant of matchDetails.info.participants) {"
                        "if (participant.puuid === puuid) { numberOfKills = participant.kills; break; }"
                        "}"
                        "return Functions.encodeUint256(numberOfKills);";

    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    /**
     * @notice Sends an HTTP request for character information
     * @param subscriptionId The ID for the Chainlink subscription
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendRequest(
        uint64 subscriptionId,
        string[] calldata args
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        character = string(response);
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, character, s_lastResponse, s_lastError);
    }

    function startBet(
        bytes32 betId,
        Player memory player1Data
    ) external payable {
        require(msg.value > 0, "Bet must have value");
        require(keccak256(abi.encodePacked(bets[betId].player1.userName)) == keccak256(abi.encodePacked('')), "Bet ID already used");

        // Create a new bet
        bets[betId] = Bet({
            player1: player1Data,
            player2: Player(address(0),'', '', '', ''),
            isActive: false,
            isFinished: false,
            betAmount: msg.value,
            finalKillCount1: 0,
            finalKillCount2: 0
        });

        betIds.push(betId);
    }

    function joinBet(
        bytes32 betId,
        Player memory player2Data
    ) external payable {
        Bet storage bet = bets[betId];
        require(keccak256(abi.encodePacked(bet.player1.userName)) != keccak256(abi.encodePacked('')), "Bet does not exist");
        require(keccak256(abi.encodePacked(bet.player2.userName)) == keccak256(abi.encodePacked('')), "Bet is already full");        require(msg.value == bet.betAmount, "Bet amount must match");

        // Join the bet as player 2
        bet.player2 = player2Data;
        bet.isActive = true;

        emit BetStarted(betId, bet.player1.playerAddress, player2Data.playerAddress);
    }

    //DIESER PART HIER IST FUCKED UP ICH WEISS NICHT WIE MAN DAS AM BESTEN STORED UND DIE REQUEST EXECUTED
    function _fetchPlayerKills(bytes32 betId) internal {
        Bet storage bet = bets[betId];

        // Prepare Player 1 arguments for Chainlink Functions request
        string[] storage argsP1;

        argsP1[0] = bet.player1.apiKey;
        argsP1[1] = bet.player1.userName;
        argsP1[2] = bet.player1.tagLine;
        argsP1[3] = bet.player1.region;

        // Send Chainlink Functions request for Player 1
        bytes32 requestIdP1 = this.sendRequest(174, argsP1);
        fulfillRequest(requestIdP1);
        playerResults[bet.player1.playerAddress] = this.character;

        // Prepare Player 2 arguments
        string[] storage argsP2;

        argsP2[0] = bet.player2.apiKey;
        argsP2[1] = bet.player2.userName;
        argsP2[2] = bet.player2.tagLine;
        argsP2[3] = bet.player2.region;

        // Send Chainlink Functions request for Player 2
        bytes32 requestIdP2 = this.sendRequest(174, argsP2);


    }

    //DAS MUSS EINFACH ANGEPASST WERDEN SOBALD WIR DIE KILLS STOREN

    function determineWinner(bytes32 betId) external {
        Bet storage bet = bets[betId];
        require(bet.isActive, "Bet is not active");
        require(!bet.isFinished, "Bet is already finished");

        uint256 diff1 = _absDiff(bet.finalKillCount1, 1);
        uint256 diff2 = _absDiff(bet.finalKillCount2, 2);

        if (diff1 < diff2) {
            _payoutWinner(betId, bet.player1.playerAddress);
        } else if (diff2 < diff1) {
            _payoutWinner(betId, bet.player2.playerAddress);
        } else {
            _refundBet(betId);
        }

        bet.isFinished = true;
    }

    function _payoutWinner(bytes32 betId, address winner) internal {
        Bet storage bet = bets[betId];

        uint256 fee = (bet.betAmount * 2 * FEE_PERCENT) / 100;
        uint256 payout = (bet.betAmount * 2) - fee;

        payable(winner).transfer(payout);

        emit BetFinished(betId, winner);
    }

    function _refundBet(bytes32 betId) internal {
        Bet storage bet = bets[betId];

        payable(bet.player1.playerAddress).transfer(bet.betAmount);
        payable(bet.player2.playerAddress).transfer(bet.betAmount);

        emit BetDraw(betId);
    }

    function _absDiff(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a - b : b - a;
    }
}
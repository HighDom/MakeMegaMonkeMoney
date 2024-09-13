// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MakeMegaMonkeMoney {
    enum BetStatus {
        Pending,
        Active,
        Completed,
        Cancelled
    }

    struct Bet {
        uint256 betID;
        string gameName;
        string gameMode;
        string IGN1;
        string IGN2;
        address payable player1; //What does payable mean in this context? Does this mean we can pay out this address and that it isn't an address that isn't payable?
        address payable player2;
        uint256 amount;
        BetStatus status;
        address payable winner; //Do we need payable here? Since player1 and player2 are payable already and this will be one of them, but I guess that doens't matter
        string customConditions;
    }

    mapping(address => uint256) public balances; //public makes this publicly available?
    mapping(uint256 => Bet) public bets;
    mapping(address => uint256[]) public userBets;

    uint256 public totalBets; //Do we need this to keep track of the userBets and be able to add a new one to the array?

    // Reentrancy guard
    bool private locked; //Do we need this to lock the contract while we are f.e. withdrawing preventing multiple withdrawal

    // Events
    event Deposit(address indexed user, uint256 amount); //Why indexed? What does that do?
    event Withdrawal(address indexed user, uint256 amount);
    event BetCreated(
        uint256 indexed betID,
        address indexed creator,
        uint256 amount
    );
    event BetJoined(uint256 indexed betID, address indexed joiner);
    event BetCancelled(uint256 indexed betID, address indexed creator);
    event BetResolved(
        uint256 indexed betID,
        address indexed winner,
        uint256 amount
    );

    modifier noReentrant() {
        require(!locked, "No re-entrancy"); //So this is just a lock?
        locked = true;
        _;
        locked = false;
    }

    modifier onlyBetCreator(uint256 betID) {
        require(msg.sender == bets[betID].player1, "Not the bet creator");
        _;
    }

    modifier betExists(uint256 betID) {
        require(bets[betID].betID == betID, "Bet does not exist");
        _;
    }

    modifier betPending(uint256 betID) {
        require(bets[betID].status == BetStatus.Pending, "Bet is not pending");
        _;
    }

    modifier betActive(uint256 betID) {
        require(bets[betID].status == BetStatus.Active, "Bet is not active");
        _;
    }

    // Deposit funds into the contract
    function deposit() external payable {
        require(msg.value > 0, "Must send Ether");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Withdraw funds from the contract
    function withdraw(uint256 amount) external noReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
        emit Withdrawal(msg.sender, amount);
    }

    // Create a new bet
    function createBet(
        uint256 betID,
        string memory gameName,
        string memory gameMode,
        string memory IGN1,
        string memory IGN2,
        uint256 amount,
        string memory customConditions
    ) external {
        require(amount > 0, "Bet amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(bets[betID].betID != betID, "Bet ID already exists");

        balances[msg.sender] -= amount;

        Bet memory newBet = Bet({
            betID: betID,
            gameName: gameName,
            gameMode: gameMode,
            IGN1: IGN1,
            IGN2: IGN2,
            player1: payable(msg.sender),
            player2: payable(address(0)),
            amount: amount,
            status: BetStatus.Pending,
            winner: payable(address(0)),
            customConditions: customConditions
        });

        bets[betID] = newBet;
        userBets[msg.sender].push(betID);
        totalBets++;

        emit BetCreated(betID, msg.sender, amount);
    }

    // Join an existing bet
    function joinBet(
        uint256 betID
    ) external betExists(betID) betPending(betID) {
        Bet storage existingBet = bets[betID];
        require(existingBet.player2 == address(0), "Bet already joined");
        require(
            balances[msg.sender] >= existingBet.amount,
            "Insufficient balance"
        );

        balances[msg.sender] -= existingBet.amount;
        existingBet.player2 = payable(msg.sender);
        existingBet.status = BetStatus.Active;

        userBets[msg.sender].push(betID);

        emit BetJoined(betID, msg.sender);
    }

    // Cancel a bet before it's accepted
    function cancelBet(
        uint256 betID
    ) external betExists(betID) betPending(betID) onlyBetCreator(betID) {
        Bet storage existingBet = bets[betID];
        existingBet.status = BetStatus.Cancelled;

        balances[msg.sender] += existingBet.amount;

        emit BetCancelled(betID, msg.sender);
    }

    // Declare the winner and distribute funds
    function declareWinner(
        uint256 betID,
        address payable winner
    ) external betExists(betID) betActive(betID) {
        Bet storage existingBet = bets[betID];
        require(
            msg.sender == existingBet.player1 ||
                msg.sender == existingBet.player2,
            "Only participants can declare the winner"
        );
        require(
            winner == existingBet.player1 || winner == existingBet.player2,
            "Winner must be a participant"
        );

        existingBet.winner = winner;
        existingBet.status = BetStatus.Completed;

        uint256 totalAmount = existingBet.amount * 2;
        balances[winner] += totalAmount;

        emit BetResolved(betID, winner, totalAmount);
    }

    // Get user bets
    function getUserBets(
        address user
    ) external view returns (uint256[] memory) {
        return userBets[user];
    }

    // Fallback and receive functions to handle unexpected Ether transfers
    fallback() external payable {
        revert("Please use the deposit function");
    }

    receive() external payable {
        revert("Please use the deposit function");
    }
}

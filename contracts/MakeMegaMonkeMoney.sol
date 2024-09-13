// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract MakeMegaMonkeMoney2Player {
    struct Bet {
        uint256 betID;
        string gameName;
        string gameMode;
        string IGN1;
        string IGN2;
        string TL1;
        string TL2;
        address P1;
        address P2;
        string Location;
        uint256 betSize;
        bool betActive; //A bet is active when >2 people are in the bet
        address winner;
    }

    mapping(address => uint256) balances; //Address to pay, will keep track of the balance of the user
    mapping(address => Bet) bets; //Track of all bets a user has done
    mapping(uint256 => Bet) betsID; //Used for the joinBet function

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function createBet(
        uint256 betID,
        string memory gameName,
        string memory gameMode,
        string memory ign1,
        string memory ign2,
        string memory tl1,
        string memory tl2,
        string memory location,
        uint256 betSize
    ) public {
        require(balances[msg.sender] >= betSize);
        balances[msg.sender] -= betSize;

        Bet memory betCreated = Bet(
            betID,
            gameName,
            gameMode,
            ign1,
            ign2,
            tl1,
            tl2,
            msg.sender,
            address(0),
            location,
            betSize,
            false,
            address(0)
        );

        bets[msg.sender] = betCreated;
        betsID[betID] = betCreated;
    }

    function joinBet(uint256 betID) public payable {
        require(balances[msg.sender] >= betsID[betID].betSize);
        Bet memory currentBet = betsID[betID];
        require(currentBet.betActive == false);
        //remove beet

        balances[msg.sender] -= betsID[betID].betSize;

        betsID[betID].P2 = msg.sender;

        betsID[betID].betActive = true;
    }
}

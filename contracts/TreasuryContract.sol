// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IToken {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract TreasuryContract{
    uint256 public votingIndex;

    address public votingOpener;
    address public voter;

    bool public isStillVoting;

    mapping(uint256 => mapping(address => bool)) isVoted;

    struct TreasuryVoting {
        uint256 index;
        string votingName;
        string votingDescription;
        address to;
        uint256 amount;
        address tokenContract;
        uint256 yes;
        uint256 no;
        uint256 endDate;
        bool isPaid;
    }

    constructor(address _votingOpener, address _voter){
        votingOpener = _votingOpener;
        voter = _voter;
    }

    event VotingCreated(uint256 indexed index, string votingName, string votingDescription, address to, uint256 amount, address tokenContract, uint256 endDate);

    TreasuryVoting[] votings;

    function createTreasuryVoting(string memory _votingName, string memory _votingDescription, address _to, uint256 _amount, address _tokenContract) public {
        require(!isStillVoting);
        IToken _votingOpener = IToken(votingOpener);
        
        require(_votingOpener.balanceOf(votingOpener) > 0);

        IToken _token = IToken(votingOpener);

        if (_to == address(0x0)) {
            require(address(this).balance >= _amount);
        } else {
            require(_token.balanceOf(address(this)) > _amount, "Insufficient Balance");
        }
        
        TreasuryVoting memory newVoting = TreasuryVoting({
            index: votingIndex,
            votingName: _votingName,
            votingDescription: _votingDescription,
            to: _to,
            amount: _amount,
            tokenContract: _tokenContract,
            yes: 0,
            no: 0,
            endDate: block.timestamp + 3 days,
            isPaid: false
        });

        votings.push(newVoting);
        votingIndex++;

        isStillVoting = true;

        emit VotingCreated(newVoting.index, newVoting.votingName, newVoting.votingDescription, newVoting.to, newVoting.amount, newVoting.tokenContract, newVoting.endDate);
    }

    function vote(address _caller, uint256 _index, bool _vote) public {
        require(_index < votings.length, "Voting index is out of range");

        TreasuryVoting storage voting = votings[_index];

        require(block.timestamp <= voting.endDate, "Voting has ended");
        
        IToken _token = IToken(voter);
        
        require(_token.balanceOf(_caller) > 0, "Insufficient Balance");
        require(!isVoted[_index][_caller]);

        if (_vote) {
            voting.yes += 1;
        } else {
            voting.no += 1;
        }

        isVoted[_index][_caller] = true;
}

    function getVotings() public view returns(TreasuryVoting[] memory){
        return votings;
    }

    function finishContract(uint256 _index) public {
        require(_index < votings.length, "Voting index is out of range");

        TreasuryVoting storage voting = votings[_index];

        if (block.timestamp > voting.endDate) {
            if (voting.yes > voting.no) {
                if (voting.tokenContract == address(0x0)) {
                    payable(voting.to).transfer(voting.amount);
                } else {
                    IToken _token = IToken(voting.tokenContract);
                    _token.transfer(payable(voting.to), voting.amount);
                }

                voting.isPaid = true;
            }
        }

        isStillVoting = false;
    }

    function getResult(uint256 _index) public view returns (uint256 yesVotes, uint256 noVotes) {
        require(_index < votings.length, "Voting index is out of range");

        TreasuryVoting storage voting = votings[_index];

        return (voting.yes, voting.no);
}

    receive() external payable { }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IToken {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract VotingContract{
    uint256 public votingIndex;
    address public votingOpener;
    address public voter;

    mapping(uint256 index => mapping(string => uint256)) public results;
    mapping(uint256 index => mapping(address => bool)) public isVoted;

    struct Voting {
        uint256 index;
        string votingName;
        string votingDescription;
        string[] choices;
        uint256 endDate;
    }

    constructor(address _votingOpener, address _voter){
        votingOpener = _votingOpener;
        voter = _voter;
    }

    event VotingCreated(uint256 indexed index, string votinName, string votingDescription, string[] choices, uint256 endDate);
    event Voted(uint256 indexed index, string choice);

    Voting[] votings;

    function createNewVoting(string memory _votingName, string memory _votingDescription, string[] memory _choices) public {
        IToken _token = IToken(votingOpener);

        require(_token.balanceOf(msg.sender) > 0);

        Voting memory newVoting = Voting({
            index: votingIndex,
            votingName: _votingName,
            votingDescription: _votingDescription,
            choices: _choices,
            endDate: block.timestamp + 3 days
        });

        votings.push(newVoting);
        votingIndex++;

        emit VotingCreated(newVoting.index, newVoting.votingName, newVoting.votingDescription, newVoting.choices, newVoting.endDate);

    }

    function vote(uint256 _index, string memory _choice) public {
        IToken _token = IToken(voter);

        require(_token.balanceOf(msg.sender) > 0);
        require(!isVoted[_index][msg.sender]);

        results[_index][_choice] += 1;

        isVoted[_index][msg.sender] = true;
        
        emit Voted(_index, _choice);
    }

    function getVotings() public view returns(Voting[] memory){
        return votings;
    }

    function getResult(uint256 _index) public view returns (string[] memory, uint256[] memory) {
        Voting storage voting = votings[_index];
        uint256[] memory voteCounts = new uint256[](voting.choices.length);
        string[] memory choices = voting.choices;

        for (uint256 i = 0; i < voting.choices.length; i++) {
            voteCounts[i] = results[_index][choices[i]];
        }

        return (choices, voteCounts);
    }

}
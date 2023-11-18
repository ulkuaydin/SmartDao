// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Storage {
    uint256 daoIndex;
    address owner;

    mapping(address => bool) isStorable;

    constructor(){
        owner = msg.sender;
    }

    modifier only_owner {
        require(msg.sender == owner);
        _;
    }

    modifier only_storable {
        require(isStorable[msg.sender]);
        _;
    }

    struct DAO {
        uint256 index;
        string daoName;
        address votingContract;
        address votingOpener;
        address voter;
        address treasuryVotingContract;
        address treasuryVotingOpener;
        address treasuryVoter;
        string logoURL;
        string website;
    }

    DAO[] public daos;

    function addStorableContract(address _contractAddress) public only_owner {
        isStorable[_contractAddress] = true;
    }

    function removeStorableContract(address _contractAddress) public only_owner {
        isStorable[_contractAddress] = false;
    }

    function addNewDAO(string memory _daoName, address _votingContract, address _votingOpener, address _voter, address _treasuryContract, address _treasuryVotingOpener, address _treasuryVoter, string memory _logoURL, string memory _website) public only_storable {
        DAO memory newDAO = DAO({
            index: daoIndex,
            daoName: _daoName,
            votingContract: _votingContract,
            votingOpener: _votingOpener,
            voter: _voter,
            treasuryVotingContract: _treasuryContract,
            treasuryVotingOpener: _treasuryVotingOpener,
            treasuryVoter: _treasuryVoter,
            logoURL: _logoURL,
            website: _website
        });

        daoIndex++;
        daos.push(newDAO);

    }

    function getDAOs() public view returns(DAO[] memory) {
        return daos;
    }
}

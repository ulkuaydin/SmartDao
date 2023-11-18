// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Storage {
    address owner;

    mapping(address => bool) public isStorable;

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

    function addNewDAO(DAO memory _newDAO) public only_storable {
        daos.push(_newDAO);

    }

    function getDAOs() public view returns(DAO[] memory) {
        return daos;
    }
}

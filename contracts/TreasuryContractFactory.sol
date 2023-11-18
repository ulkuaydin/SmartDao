// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./TreasuryContract.sol";

contract TreasuryContractFactory {
    function createTreasuryContract(address _votingOpener, address _voter) public returns(address) {
        TreasuryContract newTreasuryContract = new TreasuryContract(_votingOpener, _voter);

        return address(newTreasuryContract);
    }
}
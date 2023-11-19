// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "remix_tests.sol";
import "../contracts/TreasuryContractFactory.sol"; 

contract TreasuryContractFactoryTest {
    TreasuryContractFactory factory;

    function beforeEach() public {
        factory = new TreasuryContractFactory();
    }

    function testCreateTreasuryContract() public {
        address mockVotingOpener = address(0x123);
        address mockVoter = address(0x456);

        address newTreasuryContractAddr = factory.createTreasuryContract(mockVotingOpener, mockVoter);

        Assert.notEqual(newTreasuryContractAddr, address(0), "New TreasuryContract should have a valid address");

    }
}

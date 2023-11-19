// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "remix_tests.sol";
import "../contracts/VotingContractFactory.sol";

contract VotingContractFactoryTest {
    VotingContractFactory factory;

    function beforeEach() public {
        factory = new VotingContractFactory();
    }

    function testCreateVotingContract() public {
        address mockVotingOpener = address(0x123);
        address mockVoter = address(0x456);

        address newVotingContractAddr = factory.createVotingContract(mockVotingOpener, mockVoter);

        Assert.notEqual(newVotingContractAddr, address(0), "New VotingContract should have a valid address");

    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "remix_tests.sol";
import "../contracts/DefaultERC20.sol";

contract DefaultERC20Test {
    DefaultERC20 token;
    address creator = address(this);
    address recipient = address(0x123);
    address spender = address(0x456);
    uint256 initialSupply = 1000000;

    function beforeEach() public {
        token = new DefaultERC20("TestToken", "TTK", initialSupply, creator);
    }

    function testInitialTotalSupply() public {
        uint256 expectedSupply = initialSupply;
        Assert.equal(token.totalSupply(), expectedSupply, "Total supply should be initialized correctly");
    }

    function testInitialBalanceOfCreator() public {
        uint256 expectedBalance = initialSupply;
        Assert.equal(token.balanceOf(creator), expectedBalance, "Creator should have all initial tokens");
    }

    function testTransfer() public {
        uint256 transferAmount = 500;
        bool success = token.transfer(recipient, transferAmount);
        Assert.equal(success, true, "Transfer should return true");
        Assert.equal(token.balanceOf(recipient), transferAmount, "Recipient should receive the correct amount");
        Assert.equal(token.balanceOf(creator), initialSupply - transferAmount, "Creator should have decreased balance");
    }

    function testApprove() public {
        uint256 approveAmount = 1000;
        bool success = token.approve(spender, approveAmount);
        Assert.equal(success, true, "Approve should return true");
        Assert.equal(token.allowance(creator, spender), approveAmount, "Allowance should be set correctly");
    }

    function testTransferFrom() public {
        uint256 approveAmount = 1000;
        uint256 transferAmount = 500;

        address currentContractAddress = address(this);

        token.approve(currentContractAddress, approveAmount);
        Assert.equal(token.allowance(creator, currentContractAddress), approveAmount, "Allowance should be set correctly");
        
        bool success = token.transferFrom(creator, recipient, transferAmount);
        Assert.equal(success, true, "TransferFrom should return true");
        Assert.equal(token.balanceOf(recipient), transferAmount, "Recipient should receive the correct amount");
        Assert.equal(token.balanceOf(creator), initialSupply - transferAmount, "Creator's balance should decrease correctly");
        Assert.equal(token.allowance(creator, currentContractAddress), approveAmount - transferAmount, "Allowance should decrease correctly");
}


}

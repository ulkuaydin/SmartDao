// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "remix_tests.sol"; 
import "../contracts/DefaultERC20Factory.sol"; 
import "../contracts/DefaultERC20.sol"; 

contract DefaultERC20FactoryTest {
    DefaultERC20Factory factory;

    function beforeEach() public {
        factory = new DefaultERC20Factory();
    }

    function testCreateDefaultERC20() public {
        string memory name = "TestToken";
        string memory symbol = "TTK";
        uint256 totalSupply = 1000000;
        address creator = address(this);

        address tokenAddress = factory.createDefaultERC20(name, symbol, totalSupply, creator);
        Assert.notEqual(tokenAddress, address(0), "Token address should not be zero");

        DefaultERC20 token = DefaultERC20(tokenAddress);
        Assert.equal(token.name(), name, "Token name should match");
        Assert.equal(token.symbol(), symbol, "Token symbol should match");
        Assert.equal(token.totalSupply(), totalSupply, "Total supply should match");
        Assert.equal(token.balanceOf(creator), totalSupply, "Creator should have all initial tokens");
    }
}

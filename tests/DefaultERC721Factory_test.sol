// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "remix_tests.sol"; 
import "../contracts/DefaultERC721Factory.sol"; 
import "../contracts/DefaultERC721.sol"; 

contract DefaultERC721FactoryTest {
    DefaultERC721Factory factory;

    function beforeEach() public {
        factory = new DefaultERC721Factory();
    }

    function testCreateDefaultERC721() public {
        string memory name = "TestNFT";
        string memory symbol = "TNFT";
        uint256 totalSupply = 100;

        address nftAddress = factory.createDefaultERC721(name, symbol, totalSupply);
        Assert.notEqual(nftAddress, address(0), "NFT address should not be zero");

        DefaultERC721 nft = DefaultERC721(nftAddress);
        Assert.equal(nft.name(), name, "NFT name should match");
        Assert.equal(nft.symbol(), symbol, "NFT symbol should match");
        Assert.equal(nft.totalSupply(), totalSupply, "Total supply should match");
    }
}

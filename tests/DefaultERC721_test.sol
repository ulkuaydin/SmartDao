// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "remix_tests.sol";
import "../contracts/DefaultERC721.sol";

contract DefaultERC721Test {
    DefaultERC721 token;
    address testAddress1 = address(0x123);
    address testAddress2 = address(0x456);
    uint256 tokenId1 = 1;
    uint256 tokenId2 = 2;

    function beforeAll() public {
        token = new DefaultERC721("TestToken", "TTK", 10);
        token._mint(testAddress1, tokenId1); 
        token._mint(testAddress2, tokenId2);
    }

    function testOwnerOf() public {
        Assert.equal(token.ownerOf(tokenId1), testAddress1, "Owner should be testAddress1");
        Assert.equal(token.ownerOf(tokenId2), testAddress2, "Owner should be testAddress2");
    }

    function testBalanceOf() public {
        Assert.equal(token.balanceOf(testAddress1), 1, "Balance should be 1");
        Assert.equal(token.balanceOf(testAddress2), 1, "Balance should be 1");
    }

    function testTransferFrom() public {
        token.transferFrom(testAddress1, testAddress2, tokenId1);
        Assert.equal(token.ownerOf(tokenId1), testAddress2, "Owner should be changed to testAddress2");
        Assert.equal(token.balanceOf(testAddress1), 0, "Balance of testAddress1 should be 0");
        Assert.equal(token.balanceOf(testAddress2), 2, "Balance of testAddress2 should be 2");
    }
}

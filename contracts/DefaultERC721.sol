// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract DefaultERC721 {
    string public name;
    string public symbol;
    uint256 public totalSupply;

    mapping(uint256 => address) private _tokenOwner;
    mapping(address => uint256) private _ownedTokensCount;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "Token not exist");
        return owner;
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == from, "Not the token owner");
        require(to != address(0), "Address zero is not valid");

        _ownedTokensCount[from] -= 1;
        _ownedTokensCount[to] += 1;
        _tokenOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function _mint(address to, uint256 tokenId) public {
        require(to != address(0), "Address zero is not valid");
        require(_tokenOwner[tokenId] == address(0), "Token already minted");
        require(tokenId <= totalSupply);

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Address zero is not valid");
        return _ownedTokensCount[owner];
    }
}
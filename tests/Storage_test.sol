// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "remix_tests.sol"; // Remix'te otomatik olarak eklenir
import "../contracts/Storage.sol"; // Kontratınızın dosya yolu

contract StorageTest {
    Storage storageContract;
    address testAddress1 = address(0x123);
    address testAddress2 = address(0x456);

    function beforeEach() public {
        storageContract = new Storage();
    }

    function testAddAndRemoveStorableContract() public {
        storageContract.addStorableContract(testAddress1);
        Assert.equal(storageContract.isStorable(testAddress1), true, "Contract should be added as storable");

        storageContract.removeStorableContract(testAddress1);
        Assert.equal(storageContract.isStorable(testAddress1), false, "Contract should be removed from storable");
    }

    function testAddNewDAO() public {
        // DAO ekleme testi
        Storage.DAO memory newDAO = Storage.DAO({
            index: 0,
            daoName: "TestDAO",
            votingContract: testAddress1,
            votingOpener: testAddress1,
            voter: testAddress1,
            treasuryVotingContract: testAddress1,
            treasuryVotingOpener: testAddress1,
            treasuryVoter: testAddress1,
            logoURL: "https://example.com/logo.png",
            website: "https://example.com"
        });

        storageContract.addStorableContract(address(this)); // Test kontratını storable olarak ekle
        storageContract.addNewDAO(newDAO);

        Storage.DAO[] memory daos = storageContract.getDAOs();
        Assert.equal(daos[0].daoName, "TestDAO", "DAO name should match the one that was added");
    }
}

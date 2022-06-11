const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("simpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Value of Number Should Be 0", async function () {
    const valueNumber = await simpleStorage.retrieve();
    const expectedNumber = "0";
    assert.equal(expectedNumber, valueNumber.toString());
  });
  it("Value of Number Is Stored", async function () {
    const expectedNumber = "10";
    const storeNumber = await simpleStorage.store(10);
    const storeTransaction = await storeNumber.wait(1);
    const newValue = await simpleStorage.retrieve();
    assert.equal(expectedNumber, newValue.toString());
  });
});

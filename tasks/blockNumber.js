const { task } = require("hardhat/config");

task("blockNumber", "Generating Block Number").setAction(
  async (taskArg, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(blockNumber);
  }
);

module.exports = {};

// import tools
const { ethers, network, run } = require("hardhat");
// main function

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying...");
  const SimpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorage.deployed();
  console.log("deployed");
  if (
    network.config.url === process.env.RINKEBY_RPC_URL &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log("Waiting for block confirmations...");
    await SimpleStorage.deployTransaction.wait(6);
    await verify(SimpleStorage.address, []);
  }

  const FavoriteNumber = await SimpleStorage.retrieve();
  console.log(`Favourite Number: ${FavoriteNumber}`);
  const StoreResponse = await SimpleStorage.store(10);
  await StoreResponse.wait(1);
  const UpdatedNumber = await SimpleStorage.retrieve();
  console.log(`New Number: ${UpdatedNumber}`);
  console.log(SimpleStorage.address);
}
// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

// call function
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

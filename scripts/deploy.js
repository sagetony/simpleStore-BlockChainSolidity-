// import tools
const { ethers } = require("hardhat");
// main function

async function main() {
  const SimpleStorageFactory = await ethers.ContractFactory("SimpleStorage");
  console.log("Deploying...");
  const SimpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorage.deployed();
  console.log("deployed");
}

// call function
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

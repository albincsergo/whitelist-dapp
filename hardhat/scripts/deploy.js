// imports
const { ethers, run, network } = require("hardhat");
// async main
async function main() {
  const WhitelistFactory = await ethers.getContractFactory("Whitelist");
  console.log("🔄 Deploying whitelist...");
  const whitelist = await WhitelistFactory.deploy(10);
  await whitelist.deployed();
  console.log("🚢 Whitelist is deployed to", whitelist.address);
  if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
    await whitelist.deployTransaction.wait(6);
    await verify(whitelist.address, [10]);
  } else {
    console.log("🚫 Skipping Etherscan verification");
  }
}

async function verify(contractAddress, args) {
  console.log("✔️ Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("✔️ Contract is already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

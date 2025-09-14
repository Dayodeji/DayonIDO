const hre = require("hardhat");

async function main() {
  // Deploy the IDO contract
  const IDO = await hre.ethers.getContractFactory("SimpleIDO");
  const ido = await IDO.deploy();
  await ido.deployed();
  console.log("IDO deployed to:", ido.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

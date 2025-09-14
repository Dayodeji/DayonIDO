const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleIDO", function () {
  let owner, user, tokenA, tokenB, ido;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    // Deploy mock TokenA and TokenB
    const ERC20 = await ethers.getContractFactory("ERC20Mock");
    tokenA = await ERC20.deploy("TokenA", "TKA", owner.address, ethers.utils.parseEther("1000000"));
    tokenB = await ERC20.deploy("TokenB", "TKB", user.address, ethers.utils.parseEther("1000000"));
    await tokenA.deployed();
    await tokenB.deployed();
    // Deploy IDO contract
    const IDO = await ethers.getContractFactory("SimpleIDO");
    ido = await IDO.deploy();
    await ido.deployed();
    // Transfer TokenA to IDO contract
    await tokenA.transfer(ido.address, ethers.utils.parseEther("10000"));
  });

  it("should allow user to buy TokenA with TokenB", async function () {
    // User approves IDO contract to spend TokenB
    await tokenB.connect(user).approve(ido.address, ethers.utils.parseEther("100"));
    // User buys TokenA
    await expect(ido.connect(user).buyTokenAWithTokenB(ethers.utils.parseEther("1")))
      .to.emit(ido, "TokensPurchased");
  });
});

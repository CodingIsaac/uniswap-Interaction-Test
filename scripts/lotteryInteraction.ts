import { ethers } from "hardhat";

async function main() {
  

  

  const LOTTERY = await ethers.getContractFactory("Lottery");
  const lottery = await LOTTERY.deploy();

  await lottery.deployed();
  
  console.log(`Address ${lottery.address}`);

//   INTERACTIONS WITH THE CONTRACT

const deposit = await lottery.depositLottery({value: ethers.utils.parseEther("0.1")});

console.log(deposit);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
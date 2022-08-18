const helpers = require("@nomicfoundation/hardhat-network-helpers");
// require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

async function main() {
    /**What do I intend to achieve in these lines of code:
     * a. ERC20 uniswap interaction
     * b. Approve a Uniswap transaction
     * c. swap token calling the necessary function
     * 
     * so, how will this be done? Impersonating an account
     * 
     * 
     */
const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const UNISWAPRouter = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
const amountOut = 3000e6;

// const helpers = require("@nomicfoundation/hardhat-network-helpers");

// const USDTHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
// await helpers.impersonatedAccount(USDTHolder);
// const impersonatedSigner = await ethers.getSigner(USDTHolder);

// Having completed the impersonated account and the intended swap token, let's not interact with it.
const helpers = require("@nomicfoundation/hardhat-network-helpers");

const USDTHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
await helpers.impersonateAccount(USDTHolder);
const impersonatedSigner = await ethers.getSigner(USDTHolder);
// 

const USDT = await ethers.getContractAt(
    "Token",
    USDTAddress,
    impersonatedSigner
  );
  const DAI = await ethers.getContractAt("Token", DAIAddress);
  const ROUTER = await ethers.getContractAt(
    "IUniswap",
    UNISWAPRouter,
    impersonatedSigner
  );
  await USDT.approve(UNISWAPRouter, amountOut);
    const usdtBal = await USDT.balanceOf(USDTHolder);
    const daiBal = await DAI.balanceOf(USDTHolder);

    console.log("balance before swap", usdtBal, daiBal);

  await ROUTER.swapTokensForExactTokens(
    amountOut,
    3000,
    [USDTAddress, DAIAddress],
    USDTHolder,
    1670674129
  );

    const usdtBalAfter = await USDT.balanceOf(USDTHolder);
    const daiBalAfter = await DAI.balanceOf(USDTHolder);

    console.log("balance after swap", usdtBalAfter, daiBalAfter);

}


  

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});






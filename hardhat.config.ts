import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: ".env" });




type HttpNetworkAccountsUserConfig = any;


const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    gorli: {
      url: "https://goerli.infura.io/v3/6f01a1a6792048e09192bcd4012d164d",
      
    },

    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/6f01a1a6792048e09192bcd4012d164d",
        
        
        

      }
    }
},

}

export default config;
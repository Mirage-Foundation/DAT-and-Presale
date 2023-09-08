import { task } from "hardhat/config";

import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  bsctestnet: 97,
  bscmainnet: 56
};

var blockchain = "bsc";

const MNEMONIC = process.env.MNEMONIC || "";
const MNEMONIC_MAINNET = process.env.MNEMONIC_MAINNET || "";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
const MORALIS_API_KEY = process.env.MORALIS_API_KEY || "";


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  let url: string;
  let _mnemonic = MNEMONIC;

  if(network == "bsctestnet" || network == "bscmainnet"){
    if(network == "bscmainnet"){
      _mnemonic = MNEMONIC_MAINNET;
    }
    blockchain = "bsc";
    url = "https://goerli.infura.io/v3/f6fd7a1bb98f49809ad1f6c4346e3020";
  }else{
    blockchain = "eth";
    url = "https://goerli.infura.io/v3/f6fd7a1bb98f49809ad1f6c4346e3020";
  }

  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: _mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: 5,
    url,
    gas: 2000000000,
  };
}

// Define your Hardhat configuration
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: chainIds.hardhat,
      forking: {
        url: "https://goerli.infura.io/v3/f6fd7a1bb98f49809ad1f6c4346e3020",
      },
    },
    mainnet: createTestnetConfig("mainnet"),
    goerli: createTestnetConfig("goerli"),
    kovan: createTestnetConfig("kovan"),
    rinkeby: createTestnetConfig("rinkeby"),
    ropsten: createTestnetConfig("ropsten"),
    bsctestnet: createTestnetConfig("bsctestnet"),
    bscmainnet: createTestnetConfig("bscmainnet"),
  },
  etherscan: {
    apiKey: BSCSCAN_API_KEY,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  mocha: {
    timeout: 20000000,
  },
};

export default config;
# This is an archive branch for DATv1.DO NOT DELETE OR MERGE

## Usage

### Pre Requisites

Before running any command, make sure to install dependencies:

```
$ yarn 
```

### Compile

Compile the smart contracts with Hardhat:

```
$ yarn compile
```

### Deploy contract to a live network + validate to bscscan

Note: requires mnemonic and Moralis API key

```
$ npx hardhat run deploy --network bsctestnet
```

### Test contract locally (BSC mainnet fork)

Note: requires Moralis API key

```
$ yarn test
```

### Rebuild contracts

Note: May need to give permission

```
$ ./rebuild.sh
```

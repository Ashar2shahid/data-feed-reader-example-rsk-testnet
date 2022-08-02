# API3 data feed reader example

> An example project for reading API3 data feeds on the Polygon testnet

API3 serves three kinds of data feeds:

- [Beacon](https://medium.com/api3/beacons-building-blocks-for-web3-data-connectivity-df6ad3eb5763): A single-source
  data feed, addressed by the hash of its parameters
- Beacon set (not offered yet): Aggregation of multiple Beacons, addressed by the hash of the underlying Beacon IDs
- [dAPI](https://medium.com/api3/dapis-apis-for-dapps-53b83f8d2493): A managed data feed that is pointed to a Beacon or
  a Beacon set, addressed by its human-readable name

All data feeds that API3 serves on a chain can be read from a single DapiServer contract using the name for dAPIs and
the ID for Beacons and Beacon sets. In this repo, we inherit the DapiReader contract to implement an example data feed
reader contract that reads from Beacon IDs.

## Access control

Anyone can read an API3 data feed with an off-chain, static call. However, only contracts allowed by an authorized
account are allowed to read on-chain. For production use-cases on mainnet, you will need to pay for contract read
access. On Rsk Testnet, there is a contract that you can call to allow your contract to do on-chain reads for free for
testing purposes, which we use in this repo.

## data feed IDs

Beacons and Beacon sets are read using their IDs. You can find the Beacons Ids(known as Datafeed Id) in
`./dataFeedIds.json`

## Installation instructions

- Install dependencies

```sh
yarn
```

- Enter credentials

```sh
cp credentials.example.json credentials.json

# ..and populate credentials.json with your mnemonic
```

## Reading data feeds off-chain

Use the scripts below to read the data feeds off-chain. You need to do the static call with a VoidSigner with address 0,
see the scripts for details.

```sh
yarn run:off-chain-read-with-id
```

## Deploying DataFeedReaderExample

- Get RSK Testnet tokens from the [faucet](https://faucet.rsk.co/)

- Deploy DataFeedReaderExample

```sh
yarn deploy
```

## Reading data feeds with ID using DataFeedReaderExample

First send a transaction to allow the deployed DataFeedReaderExample contract to read the data feed. Note that you only
need to do this once, and [you can only do this on RSK testnet](#access-control).

```sh
yarn run:allow-to-read-with-id
```

Then, you can use the script below to have the DataFeedReaderExample contract read the data feed.

```sh
yarn run:read-with-id
```

You can also omit the timestamp and only read the value.

```sh
yarn run:read-value-with-id
```

## Local development and testing

A MockDapiServer contract is provided for local development and testing. See the tests for its usage, and run the tests
with

```sh
yarn test
```

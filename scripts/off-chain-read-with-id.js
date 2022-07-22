const hre = require('hardhat');
const dapiServerDeployment = require('@api3/operations/chain/deployments/polygon-testnet/DapiServer.json');

async function main() {
  const voidSignerAddressZero = new hre.ethers.VoidSigner(hre.ethers.constants.AddressZero, hre.ethers.provider);
  const dapiServer = new hre.ethers.Contract(
    '0x3A09C138609F4b944EB7B8F0730e1972C243B33a',
    dapiServerDeployment.abi,
    voidSignerAddressZero
  );
  const dataFeedId = process.env.DATA_FEED_ID;
  if (!dataFeedId) {
    throw new Error('Data feed ID not defined');
  }
  const dataFeed = await dapiServer.readDataFeedWithId(dataFeedId);
  console.log(
    `VoidSigner with address 0 read data feed with ID ${dataFeedId} as \n  value: ${dataFeed.value.toString()}\n  timestamp: ${dataFeed.timestamp.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

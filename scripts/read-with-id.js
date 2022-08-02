const hre = require('hardhat');
const dataFeedIds = require('../dataFeedIds.json');

async function main() {
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const dataFeedReaderExample = new hre.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    hre.ethers.provider
  );
  const dataFeedValues = (await Promise.all(
    Object.entries(dataFeedIds)
      .map(async ([name, id]) => ({ 
        name,
        id,
        dataFeed: await dataFeedReaderExample.readDataFeedWithId(id),
       })),
  ));
  console.log(`DataFeedReaderExample at ${DataFeedReaderExample.address}`);
  dataFeedValues.forEach(({ name, id, dataFeed }) => {
    console.log(` read ${name} data feed with ID ${id} as \n  value: ${dataFeed.value.toString()}\n  timestamp: ${dataFeed.timestamp.toString()} (${new Date(
      dataFeed.timestamp.toNumber() * 1000
    ).toISOString()})`);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

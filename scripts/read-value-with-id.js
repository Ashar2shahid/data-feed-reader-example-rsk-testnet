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
        value: await dataFeedReaderExample.readDataFeedValueWithId(id),
       })),
  ));
  console.log(`DataFeedReaderExample at ${DataFeedReaderExample.address}`);
  dataFeedValues.forEach(({ name, id, value }) => {
    console.log(` read ${name} value with ID ${id} as \n    value: ${value.toString()}`);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

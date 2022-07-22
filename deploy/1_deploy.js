const hre = require('hardhat');
const api3OperationsDeploymentReferences = require('@api3/operations/chain/deployments/references.json');

module.exports = async () => {
  const dapiServerAddress = '0x3A09C138609F4b944EB7B8F0730e1972C243B33a';
  const dataFeedReaderExample = await hre.deployments.deploy('DataFeedReaderExample', {
    args: [dapiServerAddress],
    from: (await hre.getUnnamedAccounts())[0],
    log: true,
  });
  console.log(`Deployed DataFeedReaderExample at ${dataFeedReaderExample.address}`);
};

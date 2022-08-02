const hre = require('hardhat');
const dataFeedIds = require('../dataFeedIds.json');

async function main() {
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const dataFeedReaderExample = new hre.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    hre.ethers.provider
  );
  const selfServeDapiServerWhitelisterAddressOnRskTestnet = '0x928922A4e2D3f96Ce72002A5EA7481BEF4F12fD6';
  const selfServeDapiServerWhitelisterAbi = [
    'function allowToReadDataFeedWithIdFor30Days(bytes32 dataFeedId, address reader) public',
    'function allowToReadDataFeedWithDapiNameFor30Days(bytes32 dapiName, address reader) external',
  ];
  const selfServeDapiServerWhitelister = new hre.ethers.Contract(
    selfServeDapiServerWhitelisterAddressOnRskTestnet,
    selfServeDapiServerWhitelisterAbi,
    (await hre.ethers.getSigners())[0]
  );

  console.log(`DataFeedReaderExample is allowed...`);
  const dataFeedArr = Object.entries(dataFeedIds);
  const sendTxsSequentially = async () => {
    const nameAndId = dataFeedArr.pop();
    if (nameAndId) {
      const [name, id] = nameAndId;
      const allowToReadReceipt = await selfServeDapiServerWhitelister.allowToReadDataFeedWithIdFor30Days(
        id,
        DataFeedReaderExample.address
      );
      await allowToReadReceipt.wait();
      const accessStatus = await dataFeedReaderExample.dataFeedIdToReaderToWhitelistStatus(
        id,
        dataFeedReaderExample.address
      );
      console.log(
        ` to read ${name} data feed with ID ${id} until ${new Date(
          accessStatus.expirationTimestamp.toNumber() * 1000
        ).toISOString()}. It is granted indefinite access ${accessStatus.indefiniteWhitelistCount} times.`
      );
      await sendTxsSequentially();
    }
  };
  await sendTxsSequentially();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

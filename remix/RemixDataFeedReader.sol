// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/dapis/interfaces/IDapiServer.sol";
import "https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/dapis/interfaces/IDapiReader.sol";

interface ISelfServeDapiServerWhitelister {
    function allowToReadDataFeedWithIdFor30Days(
        bytes32 dataFeedId,
        address reader
    ) external;

    function allowToReadDataFeedWithDapiNameFor30Days(
        bytes32 dapiName,
        address reader
    ) external;
}

contract DataFeedReaderExample {
    address public dapiServer;
    address public selfServeDapiServerWhitelister;

    constructor(address _dapiServer, address _selfServeDapiServerWhitelister) {
        dapiServer = _dapiServer;
        selfServeDapiServerWhitelister = _selfServeDapiServerWhitelister;
    }

    function whitelistDataFeedWithId(bytes32 dataFeedId) external {
        ISelfServeDapiServerWhitelister(selfServeDapiServerWhitelister)
            .allowToReadDataFeedWithIdFor30Days(dataFeedId, address(this));
    }

    function readDataFeedWithId(bytes32 dataFeedId)
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        (value, timestamp) = IDapiServer(dapiServer).readDataFeedWithId(
            dataFeedId
        );
    }

    function readDataFeedValueWithId(bytes32 dataFeedId)
        external
        view
        returns (int224 value)
    {
        value = IDapiServer(dapiServer).readDataFeedValueWithId(dataFeedId);
    }

    function dataFeedIdToReaderToWhitelistStatus(
        bytes32 dataFeedId,
        address reader
    )
        external
        view
        returns (uint64 expirationTimestamp, uint192 indefiniteWhitelistCount)
    {
        return
            IDapiServer(dapiServer).dataFeedIdToReaderToWhitelistStatus(
                dataFeedId,
                reader
            );
    }
}

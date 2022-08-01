//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Whitelist {
    uint8 public immutable maxWhitelistedAddresses;

    mapping(address => bool) public whitelistedAddresses;

    uint8 public numberOfWhitelistedAddresses;

    modifier WhiteList() {
        require(!whitelistedAddresses[msg.sender], "Already whitelisted");
        require(
            numberOfWhitelistedAddresses < maxWhitelistedAddresses,
            "Max whitelisted addresses reached"
        );

        _;
    }

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addToWhitelist() public {
        whitelistedAddresses[msg.sender] = true;
        numberOfWhitelistedAddresses++;
    }
}

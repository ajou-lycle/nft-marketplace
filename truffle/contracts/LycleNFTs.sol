// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC1155Connector.sol";

contract LycleNFTs is ERC1155Connector {
  constructor(string memory baseUriNFT) ERC1155Connector (baseUriNFT) {

  }
}

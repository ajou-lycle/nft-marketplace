// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC1155Connector.sol";

contract LycleNFTs is ERC1155Connector {
  constructor(string memory base_uri) ERC1155Connector (base_uri) {

  }

  function mint(address to, uint256 id, uint256 amount, bytes memory json) public {
        require(!exists(id), "Error - token already exists");
        _mint(to, id, amount, json);
    }
}

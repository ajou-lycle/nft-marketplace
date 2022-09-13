// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC1155Connector.sol";

contract LycleStorage is ERC1155Connector {
  constructor(string memory base_uri) ERC1155Connector (base_uri) {

  }

  function mint(address to, uint256 id, uint256 amount, bytes memory json) public {
        // this is deprecated on ^0.6.0 - uint256 _id = KryptoBirdz.push(_KryptoBird);
        // .push no longer returns the length but a ref the added element
        _mint(to, id, amount, json);
    }
}

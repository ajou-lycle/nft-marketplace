// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC1155Token.sol";

contract ERC1155TokenFactory {
    ERC1155Token[] public ERC1155TokenArray;

    constructor() {}

    function createNewERC1155Token(string memory baseURI) public {
        ERC1155Token erc1155Token = new ERC1155Token(baseURI, msg.sender);
        ERC1155TokenArray.push(erc1155Token);
    }

    function totalDeployedContract() public view returns(uint256) {
        return ERC1155TokenArray.length;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC1155Token.sol";
import "./ERC1155TokenEnumerable.sol";

contract ERC1155TokenFactory is ERC1155TokenEnumerable {
    event CreateNewERC1155Token(string name, address contractAddress);

    ERC1155Token[] public ERC1155TokenArray;

    constructor() {}

    function createNewERC1155Token(string memory name, string memory symbol, string memory baseURI) public onlyEmptyName(name) {
        ERC1155Token erc1155Token = new ERC1155Token(name, symbol, baseURI, msg.sender);
        ERC1155TokenArray.push(erc1155Token);

        setContractAddressByName(name, address(erc1155Token));

        emit CreateNewERC1155Token(name, address(erc1155Token));
    }

    function totalDeployedContract() public view returns(uint256) {
        return ERC1155TokenArray.length;
    }
}

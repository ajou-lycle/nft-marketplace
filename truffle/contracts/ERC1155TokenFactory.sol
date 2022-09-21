// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC1155Token.sol";

contract ERC1155TokenFactory {
    event CreateNewERC1155Token(string name, address contractAddress);

    mapping(string => address) private _contractAddresses;
    ERC1155Token[] public ERC1155TokenArray;

    constructor() {}

    function createNewERC1155Token(string memory name, string memory symbol, string memory baseURI) public {
        require(_contractAddresses[name] == address(0x0), "There is already existed contract with name");

        ERC1155Token erc1155Token = new ERC1155Token(name, symbol, baseURI, msg.sender);
        ERC1155TokenArray.push(erc1155Token);

        address contractAddress = address(erc1155Token);
        _contractAddresses[name] = contractAddress;
        emit CreateNewERC1155Token(name, contractAddress);
    }

    function totalDeployedContract() public view returns(uint256) {
        return ERC1155TokenArray.length;
    }

    function getContractAddressByName(string memory name) public view returns(address) {
        return _contractAddresses[name];
    }
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ERC1155TokenEnumerable {
    mapping(string => address) private _contractAddresses;

    constructor() {}
    
    modifier onlyEmptyName(string memory name) {
        require(_contractAddresses[name] == address(0x0), "There is already existed contract with name");
        _;
    }

    function setContractAddressByName(string memory name, address contractAddress) public onlyEmptyName(name) {
        _contractAddresses[name] = contractAddress;
    }

    function getContractAddressByName(string memory name) public view returns(address) {
        return _contractAddresses[name];
    }
}

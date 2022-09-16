// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
contract ERC1155Connector is ERC1155PresetMinterPauser, ERC1155Supply, ERC1155URIStorage {
    constructor(string memory base_uri) ERC1155PresetMinterPauser(base_uri) {
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply, ERC1155PresetMinterPauser) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    } 

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155PresetMinterPauser)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
}
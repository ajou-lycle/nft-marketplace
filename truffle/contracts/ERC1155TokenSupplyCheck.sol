// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

abstract contract ERC1155TokenSupplyCheck is ERC1155Supply, ERC1155URIStorage {
    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return ERC1155URIStorage.uri(tokenId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                if(totalSupply(i) != 0) {
                    require((keccak256(abi.encodePacked(uri(ids[i]))) == keccak256(abi.encodePacked(ERC1155.uri(213), data))), "Can't be minted.");
                }
            }
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._afterTokenTransfer(operator, from, to, ids, amounts, data);
    
        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                _setURI(ids[i], string(abi.encodePacked(data)));
            }
        }
    }
}
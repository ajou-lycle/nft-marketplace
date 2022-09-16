// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";


contract ERC1155Connector is ERC1155PresetMinterPauser, ERC1155Supply, ERC1155URIStorage {
    bytes private _baseURI;
    bytes32 private _baseURIhash;

    constructor(string memory baseURI) ERC1155PresetMinterPauser(baseURI) {
        ERC1155URIStorage._setBaseURI(baseURI);
        _baseURI = abi.encodePacked(baseURI);
        _baseURIhash = keccak256(bytes(_baseURI));
    }    

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return ERC1155URIStorage.uri(tokenId);
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

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply, ERC1155PresetMinterPauser) {
        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                bytes32 tokenURI = keccak256(bytes(ERC1155URIStorage.uri(ids[i])));
                
                bool isCanMinted = (tokenURI == _baseURIhash || tokenURI == keccak256(abi.encodePacked(_baseURI, data)));

                require(isCanMinted, string(abi.encodePacked(Strings.toString(ids[i]), " can't be minted.")));
            }
        }

        ERC1155PresetMinterPauser._beforeTokenTransfer(operator, from, to, ids, amounts, data);
        ERC1155Supply._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155) {
        super._afterTokenTransfer(operator, from, to, ids, amounts, data);

        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                ERC1155URIStorage._setURI(ids[i], string(abi.encodePacked(data)));
            }
        }
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import './ERC1155TokenURI.sol';

contract ERC1155Token is ERC1155PresetMinterPauser, ERC1155Supply, ERC1155TokenURI {
    constructor(string memory baseURI) ERC1155PresetMinterPauser(baseURI) {
        _setBaseURI(baseURI);
    }    

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155TokenURI) returns (string memory) {
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

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155Supply, ERC1155PresetMinterPauser, ERC1155TokenURI) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155TokenURI) {
        super._afterTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
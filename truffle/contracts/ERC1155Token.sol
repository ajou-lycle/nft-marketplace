// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC1155PresetMinterPauser.sol";
import './ERC1155TokenSupplyCheck.sol';

contract ERC1155Token is ERC1155PresetMinterPauser, ERC1155TokenSupplyCheck {
    string private _name;
    string private _symbol;
    constructor(string memory contractName, string memory contractSymbol, string memory baseURI, address owner) ERC1155PresetMinterPauser(baseURI, owner) {
        _name = contractName;
        _symbol = contractSymbol;

        _setBaseURI(baseURI);
    }    

    function name() public view returns(string memory) {
        return _name;
    }

    function symbol() public view returns(string memory) {
        return _symbol;
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155TokenSupplyCheck) returns (string memory) {
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
    ) internal virtual override(ERC1155PresetMinterPauser, ERC1155TokenSupplyCheck) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155TokenSupplyCheck) {
        super._afterTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
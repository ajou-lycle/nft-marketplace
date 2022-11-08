// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

abstract contract ERC1155TokenSupplyCheck is ERC1155Supply, ERC1155URIStorage {
    mapping(address => uint256[]) private _holdedTokenIds;
    
    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return ERC1155URIStorage.uri(tokenId);
    }

    function holdedTokenIds(address holder) public view returns(uint256[] memory) {
        return _holdedTokenIds[holder];
    }

    function _remove(address holder, uint index) internal {
        require(index < _holdedTokenIds[holder].length);

        _holdedTokenIds[holder][index] = _holdedTokenIds[holder][_holdedTokenIds[holder].length-1];
        _holdedTokenIds[holder].pop();
    }


    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155) {    
        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                _setURI(ids[i], string(abi.encodePacked(data)));
            }
        }

        if(from != address(0)) {
            for (uint256 i = 0; i < ids.length; i++) {
                for (uint256 j = 0; j < _holdedTokenIds[from].length; j++) {
                    if(ids[i] == _holdedTokenIds[from][j]) {
                        if(balanceOf(from, ids[i]) == amounts[i]) { 
                            _remove(from, ids[i]);
                        }
                    }
                }
            }
        }
        
        if(to != address(0)) {
            for (uint256 i = 0; i < ids.length; i++) {
                bool isExist = false;

                for (uint256 j = 0; j < _holdedTokenIds[to].length; j++) {
                    if(ids[i] == _holdedTokenIds[to][j]) {
                        _holdedTokenIds[to][j] = ids[i];
                        isExist = true;
                        break;
                    }
                }

                if(!isExist) {
                    _holdedTokenIds[to].push(ids[i]);
                }
            }
        }

        super._afterTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
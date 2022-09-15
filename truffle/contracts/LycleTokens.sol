// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ERC1155Connector.sol";

contract LycleTokens is ERC1155Connector, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    address public thisMinter;

    constructor(string memory base_uri, address minter, address burner) ERC1155Connector (base_uri) {
        _setupRole(MINTER_ROLE, minter);
        _setupRole(BURNER_ROLE, burner);

        thisMinter = minter;
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(!exists(id), "Error - token already exists");
        _mint(to, id, amount, data);
    }

    function burn(address from, uint256 id, uint256 amount) public override {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        require(exists(id), "Error - token not exists");
        _burn(from, id, amount);
    }

    function getMinter() public view returns(address) {
        return thisMinter;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return interfaceId == type(IAccessControl).interfaceId || interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||super.supportsInterface(interfaceId);
    }
}  

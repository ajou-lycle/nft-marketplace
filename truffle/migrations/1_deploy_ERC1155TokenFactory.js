const ERC1155TokenFactory = artifacts.require("ERC1155TokenFactory");
require("dotenv").config({path: "../.env"});

module.exports = function (deployer) {
    deployer.deploy(ERC1155TokenFactory);
};

const LycleNFTs = artifacts.require("LycleNFTs");
require("dotenv").config({path: "../.env"});

module.exports = async function (deployer) {
  deployer.deploy(LycleNFTs, await process.env.BASE_URI_NFT);
};

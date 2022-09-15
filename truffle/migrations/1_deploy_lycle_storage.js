const LycleNFTs = artifacts.require("LycleNFTs");
require("dotenv").config();

module.exports = async function (deployer) {
  deployer.deploy(LycleNFTs, await process.env.BASE_URI);
};

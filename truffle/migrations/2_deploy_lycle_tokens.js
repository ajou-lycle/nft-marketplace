const LycleTokens = artifacts.require("LycleTokens");
require("dotenv").config();

module.exports = async function (deployer) {
  deployer.deploy(LycleTokens, await process.env.BASE_URI);
};

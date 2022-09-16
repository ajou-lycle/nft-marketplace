const LycleTokens = artifacts.require("LycleTokens");
require("dotenv").config({path: "../.env"});

module.exports = async function (deployer) {
    deployer.deploy(LycleTokens, await process.env.BASE_URI_TOKEN);
};

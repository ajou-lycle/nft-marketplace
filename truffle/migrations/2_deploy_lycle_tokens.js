const LycleTokens = artifacts.require("LycleTokens");
require("dotenv").config();

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    deployer.deploy(LycleTokens, await process.env.BASE_URI_TOKEN, addr[0], addr[0]);
};

const LycleStorage = artifacts.require("LycleStorage");
require("dotenv").config();

module.exports = async function (deployer) {
  deployer.deploy(LycleStorage, await process.env.BASE_URI);
};

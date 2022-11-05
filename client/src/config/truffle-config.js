/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 * 
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const truffleEnv = require('./truffle-env');
const mnemonic = truffleEnv.MNEMONIC;
const infura_api_key = truffleEnv.INFURA_API_KEY;
// const infuraProjectId = process.env["INFURA_PROJECT_ID"];

const HDWalletProvider = require('@truffle/hdwallet-provider');
const AccountIndex = 0;

module.exports = {
  networks: {
    goerli_infura: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/" + infura_api_key, AccountIndex)
      },
      network_id: 5,
      gas: 0x1c9c380,
      // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    }
  },
};

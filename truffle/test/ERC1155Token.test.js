const { assert } = require('chai');
const RLP = require('rlp');

const ERC1155TokenFactory = artifacts.require("ERC1155TokenFactory");
const ERC1155Token = artifacts.require("ERC1155Token");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract('ERC1155TokenFactory', (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  before(async () => {
    this.ERC1155TokenFactory = await ERC1155TokenFactory.new();
  });

  describe('factory deployment', async () => {
    it('deploys successfully', async () => {
      let contract = this.ERC1155TokenFactory;
      const address = contract.address;

      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });
  });

  describe('NFT minting', async () => {
    it('creates a new nft', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureNftContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();

      await ERC1155TokenFactoryContract.createNewERC1155Token(`${process.env.BASE_URI_NFT}${futureNftContractAddress}/`);

      const nftContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const nftContract = await ERC1155Token.at(nftContractAddress);

      const nftId = 0;
      const nftAmount = 1;
      const nftJsonPath = `${nftId}.json`;
      const nftJsonBytes = web3.utils.asciiToHex(nftJsonPath);

      const result = await nftContract.mint(deployerAccount, nftId, nftAmount, nftJsonBytes);
      const exist = await nftContract.exists(nftId);
      expect(exist).to.be.equal(true);

      const totalSupply = await nftContract.totalSupply(nftId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(1));

      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // 0
          address indexed to, // to
          uint256 id, // id
          uint256 value); // amount
      */

      const event = result.logs[0].args;

      expect(event.operator).to.be.equal(deployerAccount);
      expect(event.from).to.be.bignumber.equal(new BN(0));
      expect(event.to).to.be.equal(deployerAccount);
      expect(event.id).to.be.bignumber.equal(new BN(nftId));
      expect(event.value).to.be.bignumber.equal(new BN(nftAmount));
    });
    it('creates same nft', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const nftContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const nftContract = await ERC1155Token.at(nftContractAddress);

      const nftId = 0;
      const nftAmount = 1;
      const nftJsonPath = `${nftId}.json`;
      const nftJsonBytes = web3.utils.asciiToHex(nftJsonPath);

      const result = await nftContract.mint(deployerAccount, nftId, nftAmount, nftJsonBytes);

      const totalSupply = await nftContract.totalSupply(nftId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(2));

      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // 0
          address indexed to, // to
          uint256 id, // id
          uint256 value); // amount
      */

      const event = result.logs[0].args;

      expect(event.operator).to.be.equal(deployerAccount);
      expect(event.from).to.be.bignumber.equal(new BN(0));
      expect(event.to).to.be.equal(deployerAccount);
      expect(event.id).to.be.bignumber.equal(new BN(nftId));
      expect(event.value).to.be.bignumber.equal(new BN(nftAmount));
    });
    it("can't change a nft json path", async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const nftContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const nftContract = await ERC1155Token.at(nftContractAddress);

      const nftId = 0;
      const nftAmount = 1;
      const nftJsonPath = `${nftId + 1}.json`;
      const nftJsonBytes = web3.utils.asciiToHex(nftJsonPath);

      await expect(nftContract.mint(deployerAccount, nftId, nftAmount, nftJsonBytes))
        .to.eventually.be.rejected;
    });
  });
}); 
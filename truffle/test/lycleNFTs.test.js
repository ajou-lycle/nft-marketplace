const { assert } = require('chai');

const LycleNFTs = artifacts.require("LycleNFTs");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract('LycleNFTs', (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  before(async () => {
    this.LycleNFTs = await LycleNFTs.new(await process.env.BASE_URI_NFT);
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      let contract = this.LycleNFTs;
      const address = contract.address;

      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });
  });

  describe('minting', async () => {
    it('creates a new nft', async () => {
      let contract = this.LycleNFTs;
      const nftId = 0;
      const nftAmount = 1;
      const nftJsonPath = "first_nft.json";
      const nftJsonBytes = web3.utils.asciiToHex(nftJsonPath);

      const result = await contract.mint(accounts[0], nftId, nftAmount, nftJsonBytes);
      const exists = await contract.exists(nftId);
      expect(exists).to.equal(true);

      const url = await contract.uri(nftId);
      console.log(url);
      expect(url).to.equal(`${process.env.BASE_URI_NFT + nftJsonPath}`);

      const totalSupply = await contract.totalSupply(nftId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(nftAmount));
      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // 0
          address indexed to, // to
          uint256 id, // id
          uint256 value); // amount
      */

      const event = result.logs[0].args;

      console.log(event);

      assert.equal(event.operator, accounts[0], 'operator is msg.sender');
      assert.equal(event.from, 0x0, 'from is zero address');
      assert.equal(event.to, accounts[0], 'to is msg.sender');
      assert.equal(event.id, nftId, 'id is zero');
      assert.equal(event.value, nftAmount, 'value is amount 1');
    });

    it('creates same nft', async () => {
      let contract = this.LycleNFTs;
      const nftId = 0;
      const nftAmount = 1;
      const nftJsonPath = "first_nft.json";
      const nftJsonBytes = web3.utils.asciiToHex(nftJsonPath);

      const result = await contract.mint(accounts[0], nftId, nftAmount, nftJsonBytes);
      const exists = await contract.exists(nftId);
      expect(exists).to.equal(true);

      const url = await contract.uri(nftId);
      expect(url).to.equal(`${process.env.BASE_URI_NFT + nftJsonPath}`);

      const totalSupply = await contract.totalSupply(nftId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(nftAmount + 1));   

      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // 0
          address indexed to, // to
          uint256 id, // id
          uint256 value); // amount
      */

      const event = result.logs[0].args;

      assert.equal(event.operator, accounts[0], 'operator is msg.sender');
      assert.equal(event.from, 0x0, 'from is zero address');
      assert.equal(event.to, accounts[0], 'to is msg.sender');
      assert.equal(event.id, 0, 'id is zero');
      assert.equal(event.value, 1, 'value is amount 1');
    });

    it("can't replace json path when id is already minted", async () => {
      let contract = this.LycleNFTs;
      const nftId = 0;
      const nftAmount = 1;
      const nftJsonPath = "second_nft.json";
      const nftJsonBytes = web3.utils.asciiToHex(nftJsonPath);

      expect(contract.mint(accounts[0], nftId, nftAmount, nftJsonBytes)).to.eventually.be.rejected;
    });
  });
});
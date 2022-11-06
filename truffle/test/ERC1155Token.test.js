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
    this.totalSupply = 0;
    this.balanceOf = 0;
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

  describe('Item minting', async () => {
    it('creates a new item', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureERC1155TokenContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();

      const contractName = "LycleItems";
      const contractSymbol = "LYCLE";

      await ERC1155TokenFactoryContract.createNewERC1155Token(contractName, contractSymbol, `${process.env.BASE_URI_NFT}${futureERC1155TokenContractAddress}/`);

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const ERC1155ItemId = 0;
      const ERC1155ItemAmount = 1;
      const ERC1155ItemJsonPath = `${ERC1155ItemId}.json`;
      const ERC1155ItemJsonBytes = web3.utils.asciiToHex(ERC1155ItemJsonPath);

      const result = await ERC1155TokenContract.mint(deployerAccount, ERC1155ItemId, ERC1155ItemAmount, ERC1155ItemJsonBytes);
      const exist = await ERC1155TokenContract.exists(ERC1155ItemId);
      expect(exist).to.be.equal(true);

      const balanceOf = await ERC1155TokenContract.balanceOf(deployerAccount, ERC1155ItemId);
      expect(balanceOf).to.be.a.bignumber.equal(new BN(1));
      this.balanceOf = balanceOf;

      const totalSupply = await ERC1155TokenContract.totalSupply(ERC1155ItemId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(1));
      this.totalSupply = totalSupply;
      
      const uri = await ERC1155TokenContract.uri(ERC1155ItemId);
      expect(uri).to.be.equal(`${process.env.BASE_URI_NFT}${futureERC1155TokenContractAddress}/${ERC1155ItemId}.json`);
      
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
      expect(event.id).to.be.bignumber.equal(new BN(ERC1155ItemId));
      expect(event.value).to.be.bignumber.equal(new BN(ERC1155ItemAmount));
    });
    it('creates same item', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const ERC1155ItemId = 0;
      const ERC1155ItemAmount = 1;
      const ERC1155ItemJsonPath = `${ERC1155ItemId}.json`;
      const ERC1155JsonBytes = web3.utils.asciiToHex(ERC1155ItemJsonPath);

      const result = await ERC1155TokenContract.mint(deployerAccount, ERC1155ItemId, ERC1155ItemAmount, ERC1155JsonBytes);

      const balanceOf = await ERC1155TokenContract.balanceOf(deployerAccount, ERC1155ItemId);
      expect(balanceOf).to.be.a.bignumber.equal(new BN(2));
      this.balanceOf = balanceOf;

      const totalSupply = await ERC1155TokenContract.totalSupply(ERC1155ItemId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(2));
      this.totalSupply = totalSupply;

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
      expect(event.id).to.be.bignumber.equal(new BN(ERC1155ItemId));
      expect(event.value).to.be.bignumber.equal(new BN(ERC1155ItemAmount));
    });
    it("can't change a item json path", async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const ERC1155ItemId = 0;
      const ERC1155ItemAmount = 1;
      const ERC1155ItemJsonPath = `${ERC1155ItemId + 1}.json`;
      const ERC1155ItemJsonBytes = web3.utils.asciiToHex(ERC1155ItemJsonPath);

      await expect(ERC1155TokenContract.mint(deployerAccount, ERC1155ItemId, ERC1155ItemAmount, ERC1155ItemJsonBytes))
        .to.eventually.be.rejected;
    });
  });

  describe('Item burning', async () => {
    it('burn item, id 0', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155ItemId = 0;
      const ERC1155ItemAmount = 1;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const exist = await ERC1155TokenContract.exists(ERC1155ItemId);
      expect(exist).to.be.equal(true);

      const result = await ERC1155TokenContract.burn(deployerAccount, ERC1155ItemId, ERC1155ItemAmount);

      const balanceOf = await ERC1155TokenContract.balanceOf(deployerAccount, ERC1155ItemId);
      expect(balanceOf).to.be.a.bignumber.equal(new BN(this.balanceOf - ERC1155ItemAmount));
      this.balanceOf = balanceOf;

      const totalSupply = await ERC1155TokenContract.totalSupply(ERC1155ItemId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(this.totalSupply - ERC1155ItemAmount));
      this.totalSupply = totalSupply;

      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // from
          address indexed to, // 0
          uint256 id, // id
          uint256 value); // amount
      */

      const event = result.logs[0].args;

      expect(event.operator).to.be.equal(deployerAccount);
      expect(event.from).to.be.a.bignumber.equal(deployerAccount);
      expect(event.to).to.be.a.bignumber.equal(new BN(0));
      expect(event.id).to.be.bignumber.equal(new BN(ERC1155ItemId));
      expect(event.value).to.be.bignumber.equal(new BN(ERC1155ItemAmount));
    });
    it("can't burn item id 0, because amount exceed user balance", async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155ItemId = 0;
      const ERC1155ItemAmount = this.balanceOf + 1;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const exist = await ERC1155TokenContract.exists(ERC1155ItemId);
      expect(exist).to.be.equal(true);

      await expect(ERC1155TokenContract.burn(deployerAccount, ERC1155ItemId, ERC1155ItemAmount))
        .to.eventually.be.rejected;
    });
    it("can't burn not created item id 1", async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155ItemId = 1;
      const ERC1155ItemAmount = 1;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const exist = await ERC1155TokenContract.exists(ERC1155ItemId);
      expect(exist).to.be.equal(false);

      await expect(ERC1155TokenContract.burn(deployerAccount, ERC1155ItemId, ERC1155ItemAmount))
        .to.eventually.be.rejected;
    });
  });

  describe('Item transfer', async () => {
    it('transfer item of deployer to recipient', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155ItemId = 0;
      const ERC1155ItemAmount = 1;
      const ERC1155ItemJsonPath = `${ERC1155ItemId}.json`;
      const ERC1155ItemJsonBytes = web3.utils.asciiToHex(ERC1155ItemJsonPath);

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const exist = await ERC1155TokenContract.exists(ERC1155ItemId);
      expect(exist).to.be.equal(true);

      const result = await ERC1155TokenContract.safeTransferFrom(deployerAccount, recipient, ERC1155ItemId, ERC1155ItemAmount, ERC1155ItemJsonBytes);

      const deployerBalanceOf = await ERC1155TokenContract.balanceOf(deployerAccount, ERC1155ItemId);
      expect(deployerBalanceOf).to.be.a.bignumber.equal(new BN(this.balanceOf - ERC1155ItemAmount));
      this.balanceOf = deployerBalanceOf;

      const recipientBalanceOf = await ERC1155TokenContract.balanceOf(recipient, ERC1155ItemId);
      expect(recipientBalanceOf).to.be.a.bignumber.equal(new BN(ERC1155ItemAmount));

      const totalSupply = await ERC1155TokenContract.totalSupply(ERC1155ItemId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(this.totalSupply));

      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // from
          address indexed to, // 0
          uint256 id, // id
          uint256 value); // amount
      */

      const event = result.logs[0].args;

      expect(event.operator).to.be.equal(deployerAccount);
      expect(event.from).to.be.a.bignumber.equal(deployerAccount);
      expect(event.to).to.be.a.bignumber.equal(recipient);
      expect(event.id).to.be.bignumber.equal(new BN(ERC1155ItemId));
      expect(event.value).to.be.bignumber.equal(new BN(ERC1155ItemAmount));
    });
  });
}); 
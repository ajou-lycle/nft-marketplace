const { assert } = require('chai');
const RLP = require('rlp');

const ERC1155TokenFactory = artifacts.require("ERC1155TokenFactory");
const ERC1155Token = artifacts.require("ERC1155Token");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract('Nft Marketplace intergration test', (accounts) => {
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
    it('creates item, id 0', async () => {
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
    it('creates one more item, id 0', async () => {
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
    it('creates item, id 1', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const ERC1155ItemId = 1;
      const ERC1155ItemAmount = 1;
      const ERC1155ItemJsonPath = `${ERC1155ItemId}.json`;
      const ERC1155JsonBytes = web3.utils.asciiToHex(ERC1155ItemJsonPath);

      const result = await ERC1155TokenContract.mint(deployerAccount, ERC1155ItemId, ERC1155ItemAmount, ERC1155JsonBytes);

      const balanceOf = await ERC1155TokenContract.balanceOf(deployerAccount, ERC1155ItemId);
      expect(balanceOf).to.be.a.bignumber.equal(new BN(1));
      this.balanceOf = balanceOf;

      const totalSupply = await ERC1155TokenContract.totalSupply(ERC1155ItemId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(1));
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
    it('creates item, id 2', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const ERC1155ItemId = 2;
      const ERC1155ItemAmount = 1;
      const ERC1155ItemJsonPath = `${ERC1155ItemId}.json`;
      const ERC1155JsonBytes = web3.utils.asciiToHex(ERC1155ItemJsonPath);

      const result = await ERC1155TokenContract.mint(deployerAccount, ERC1155ItemId, ERC1155ItemAmount, ERC1155JsonBytes);

      const balanceOf = await ERC1155TokenContract.balanceOf(deployerAccount, ERC1155ItemId);
      expect(balanceOf).to.be.a.bignumber.equal(new BN(1));
      this.balanceOf = balanceOf;

      const totalSupply = await ERC1155TokenContract.totalSupply(ERC1155ItemId);
      expect(totalSupply).to.be.a.bignumber.equal(new BN(1));
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
  });

  describe('Get holder nfts', async () => {
    it('get nftId array, length is 3 and item Id is 0, 1, 2', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const result = await ERC1155TokenContract.holdedTokenIds(deployerAccount);

      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.a.bignumber.equal(new BN(0));
      expect(result[1]).to.be.a.bignumber.equal(new BN(1));
      expect(result[2]).to.be.a.bignumber.equal(new BN(2));
    });
  });

  describe('Buy NFT', async () => {
    it('transfer item of deployer, id 0, to recipient, recipient paies to deployer', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const beforeRecipientBalance = await web3.eth.getBalance(recipient);

      const ERC1155ItemId = 0;
      const ERC1155ItemAmount = 1;
      const ERC1155ItemJsonPath = `${ERC1155ItemId}.json`;
      const ERC1155ItemJsonBytes = web3.utils.asciiToHex(ERC1155ItemJsonPath);

      const ERC1155ItemPrice = web3.utils.toWei("1", "finney");

      const ERC1155TokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const ERC1155TokenContract = await ERC1155Token.at(ERC1155TokenContractAddress);

      const exist = await ERC1155TokenContract.exists(ERC1155ItemId);
      expect(exist).to.be.equal(true);

      const transactionResult  = await web3.eth.sendTransaction({from: recipient, to: deployerAccount, value: ERC1155ItemPrice});
      const transferResult = await ERC1155TokenContract.safeTransferFrom(deployerAccount, recipient, ERC1155ItemId, ERC1155ItemAmount, ERC1155ItemJsonBytes);

      const afterRecipientBalance = await web3.eth.getBalance(recipient);

      const deployerBalanceOfItem0 = await ERC1155TokenContract.balanceOf(deployerAccount, ERC1155ItemId);
      expect(deployerBalanceOfItem0).to.be.a.bignumber.equal(new BN(2 - ERC1155ItemAmount));
      this.balanceOf = deployerBalanceOfItem0;

      const recipientBalanceOfItem0 = await ERC1155TokenContract.balanceOf(recipient, ERC1155ItemId);
      expect(recipientBalanceOfItem0).to.be.a.bignumber.equal(new BN(ERC1155ItemAmount));

      const totalSupplyItem0 = await ERC1155TokenContract.totalSupply(ERC1155ItemId);
      expect(totalSupplyItem0).to.be.a.bignumber.equal(new BN(2));

      const deployerHoldedNftIds = await ERC1155TokenContract.holdedTokenIds(deployerAccount);
      const recipientHoldedNftIds = await ERC1155TokenContract.holdedTokenIds(recipient);
      const anotherHoldedNftIds = await ERC1155TokenContract.holdedTokenIds(anotherAccount);

      expect(deployerHoldedNftIds.length).to.be.equal(2);
      expect(recipientHoldedNftIds.length).to.be.equal(1);
      expect(anotherHoldedNftIds.length).to.be.equal(0);

      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // from
          address indexed to, // 0
          uint256 id, // id
          uint256 value); // amount
      */

      const event = transferResult.logs[0].args;

      expect(event.operator).to.be.equal(deployerAccount);
      expect(event.from).to.be.a.bignumber.equal(deployerAccount);
      expect(event.to).to.be.a.bignumber.equal(recipient);
      expect(event.id).to.be.bignumber.equal(new BN(ERC1155ItemId));
      expect(event.value).to.be.bignumber.equal(new BN(ERC1155ItemAmount));
    });
  });
}); 
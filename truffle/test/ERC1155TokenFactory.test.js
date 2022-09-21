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

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      let contract = this.ERC1155TokenFactory;
      const address = contract.address;

      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });
  });

  describe('create new ERC1155Token', async () => {
    it('create an NFT contract with base uri nft', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureNftContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();

      const contractName = "nftTest";
      const contractSymbol = "NFTTEST";

      await ERC1155TokenFactoryContract.createNewERC1155Token(contractName, contractSymbol, `${process.env.BASE_URI_NFT}${futureNftContractAddress}`);

      const nftContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      expect(nftContractAddress.toUpperCase()).to.be.equal(futureNftContractAddress);

      const totalDeployedContract = await ERC1155TokenFactoryContract.totalDeployedContract();
      expect(totalDeployedContract).to.be.a.bignumber.equal(new BN(1));

      const nftContract = await ERC1155Token.at(nftContractAddress);

      const name = await nftContract.name();
      expect(name).to.be.equal(contractName);

      const symbol = await nftContract.symbol();
      expect(symbol).to.be.equal(symbol);

      const baseURI = await nftContract.uri(0);
      expect(baseURI).to.be.equal(`${process.env.BASE_URI_NFT}${nftContractAddress.toUpperCase()}`);
    });
    it('create an token contract with base uri token', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureTokenContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();

      const contractName = "tokenTest";
      const contractSymbol = "TOKENTEST";

      await ERC1155TokenFactoryContract.createNewERC1155Token(contractName, contractSymbol, `${process.env.BASE_URI_TOKEN}${futureTokenContractAddress}`);

      const tokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(1);
      expect(tokenContractAddress.toUpperCase()).to.be.equal(futureTokenContractAddress);

      const totalDeployedContract = await ERC1155TokenFactoryContract.totalDeployedContract();
      expect(totalDeployedContract).to.be.a.bignumber.equal(new BN(2));

      const tokenContract = await ERC1155Token.at(tokenContractAddress);

      const name = await tokenContract.name();
      expect(name).to.be.equal(contractName);

      const symbol = await tokenContract.symbol();
      expect(symbol).to.be.equal(symbol);

      const baseURI = await tokenContract.uri(0);
      expect(baseURI).to.be.equal(`${process.env.BASE_URI_TOKEN}${tokenContractAddress.toUpperCase()}`);
    });
    it('NFT and Token contract are not same.', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const nftAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      const tokenAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(1);
      expect(nftAddress).to.not.be.equal(tokenAddress);

      const nftContract = await ERC1155Token.at(nftAddress);
      const tokenContract = await ERC1155Token.at(tokenAddress);

      const nftBaseURI = await nftContract.uri(0);
      const tokenBaseURI = await tokenContract.uri(0);
      expect(nftBaseURI).to.not.be.equal(tokenBaseURI);
    });
    it('reject name already deployed', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureNftContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();

      const contractName = "nftTest";
      const contractSymbol = "NFTTEST";

      await expect(ERC1155TokenFactoryContract.createNewERC1155Token(contractName, contractSymbol, `${process.env.BASE_URI_NFT}${futureNftContractAddress}`)).to.be.eventually.rejected;
    });
    it('fulfill symbol already deployed when name is not deployed', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureNftContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();

      const contractName = "nftSecondTest";
      const contractSymbol = "NFTTEST";

      await expect(ERC1155TokenFactoryContract.createNewERC1155Token(contractName, contractSymbol, `${process.env.BASE_URI_NFT}${futureNftContractAddress}`)).to.be.eventually.fulfilled;

      const nftSecondContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(2);
      expect(nftSecondContractAddress.toUpperCase()).to.be.equal(futureNftContractAddress);

      const nftSecondContract = await ERC1155Token.at(nftSecondContractAddress);

      const name = await nftSecondContract.name();
      expect(name).to.be.equal(contractName);

      const symbol = await nftSecondContract.symbol();
      expect(symbol).to.be.equal(symbol);
    });
  });
  describe('create more ERC1155Token', async () => {
    it('create second NFT contract with base uri nft', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureThirdNftContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();
      
      const thirdNftContractName = "thirdNftTest";
      const thirdNftContractSymbol = "3RDNFTTEST";

      await ERC1155TokenFactoryContract.createNewERC1155Token(thirdNftContractName, thirdNftContractSymbol, `${process.env.BASE_URI_NFT}${futureThirdNftContractAddress}`);

      const thirdNftContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(3);
      expect(thirdNftContractAddress.toUpperCase()).to.be.equal(futureThirdNftContractAddress);

      const firstNftContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(0);
      expect(firstNftContractAddress.toUpperCase()).to.not.be.equal(thirdNftContractAddress);

      const thirdNftContract = await ERC1155Token.at(thirdNftContractAddress);
      const thirdBaseURI = await thirdNftContract.uri(0);
      expect(thirdBaseURI).to.be.equal(`${process.env.BASE_URI_NFT}${thirdNftContractAddress.toUpperCase()}`);

      const firstNftContract = await ERC1155Token.at(firstNftContractAddress);
      const firstBaseURI = await firstNftContract.uri(0);
      expect(firstBaseURI).to.not.be.equal(thirdBaseURI);
    });
    it('create second token contract with base uri token', async () => {
      let ERC1155TokenFactoryContract = this.ERC1155TokenFactory;

      const from = ERC1155TokenFactoryContract.address;
      const nonce = await web3.eth.getTransactionCount(ERC1155TokenFactoryContract.address);

      const startPointContractAddress = 26;
      const endPointContractAddress = 66;
      const futureSecondTokenContractAddress = ('0x' + web3.utils.sha3(Buffer.from(RLP.encode([from, nonce]))).substring(startPointContractAddress, endPointContractAddress)).toUpperCase();

      const secondTokenContractName = "secondTokenTest";
      const secondTokenContractSymbol = "SECTOKENTEST";

      await ERC1155TokenFactoryContract.createNewERC1155Token(secondTokenContractName, secondTokenContractSymbol, `${process.env.BASE_URI_NFT}${futureSecondTokenContractAddress}`);

      const secondTokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(4);
      expect(secondTokenContractAddress.toUpperCase()).to.be.equal(futureSecondTokenContractAddress);

      const firstTokenContractAddress = await ERC1155TokenFactoryContract.ERC1155TokenArray(1);
      expect(firstTokenContractAddress.toUpperCase()).to.not.be.equal(secondTokenContractAddress);

      const secondTokenContract = await ERC1155Token.at(secondTokenContractAddress);
      const secondBaseURI = await secondTokenContract.uri(0);
      expect(secondBaseURI).to.be.equal(`${process.env.BASE_URI_NFT}${secondTokenContractAddress.toUpperCase()}`);

      const firstTokenContract = await ERC1155Token.at(firstTokenContractAddress);
      const firstBaseURI = await firstTokenContract.uri(0);
      expect(firstBaseURI).to.not.be.equal(secondBaseURI);
    });
  });
});
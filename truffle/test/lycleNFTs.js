const LycleNFTs = artifacts.require("LycleNFTs");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('LycleNFTs', () => {
  let contract;
  let addr;

  before(async () => {
    contract = await LycleNFTs.deployed();
    addr = await web3.eth.getAccounts();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address;

      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });
  });

  describe('minting', async () => {
    it('creates a new nft', async () => {
        const address = contract.address;
        const nftIndex = 0;
        const result = await contract.mint(addr[0], nftIndex, 1, "first nft.json");
        
        assert.equal(await contract.exist(nftIndex), `NFT ${nftIndex} is exist`);
        const totalSupply = await contract.totalSupply();

        assert.equal(totalSupply, 1);

        /*
          event TransferSingle(
            address indexed operator, // msg.sender 
            address indexed from, // 0
            address indexed to, // to
            uint256 id, // id
            uint256 value); // amount
        */

        const event = result.logs[0].args;

        assert.equal(event.operator, addr[0], 'operator is msg.sender');
        assert.equal(event.from, address(0), 'from is zero address');
        assert.equal(event.to, addr[0], 'to is msg.sender');
        assert.equal(event.id, 0, 'id is zero');
        assert.equal(event.value, 1, 'value is amount 1');
    });
    it('creates same nft', async () => {
      const address = contract.address;
      const result = await contract.mint(addr[0], 0, 1, "first nft.json");
      const totalSupply = await contract.totalSupply();

      assert.equal(totalSupply, 2);

      /*
        event TransferSingle(
          address indexed operator, // msg.sender 
          address indexed from, // 0
          address indexed to, // to
          uint256 id, // id
          uint256 value); // amount
      */

      const event = result.logs[0].args;

      assert.equal(event.operator, addr[0], 'operator is msg.sender');
      assert.equal(event.from, address(0), 'from is zero address');
      assert.equal(event.to, addr[0], 'to is msg.sender');
      assert.equal(event.id, 0, 'id is zero');
      assert.equal(event.value, 1, 'value is amount 1');
  });
});

describe('indexing', async () => {
    it('lists KryptoBirdz', async() => {
        await contract.mint('https...2');
        await contract.mint('https...3');
        await contract.mint('https...4');

        const totalSupply = await contract.totalSupply();

        let result = [];
        let kryptoBird;

        for(var i = 0; i < totalSupply; i++) {
            kryptoBird = await contract.kryptoBirdz(i);
            result.push(kryptoBird);
        }

        let expected = ['https...1', 'https...2', 'https...3', 'https...4'];

        assert.equal(result.join(','), expected.join(','), '')
    });
});

  it('should read newly written values', async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    var value = (await simpleStorageInstance.read.call()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await simpleStorageInstance.write(1);
    value = (await simpleStorageInstance.read.call()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await simpleStorageInstance.write(2);
    value = (await simpleStorageInstance.read.call()).toNumber();
    assert.equal(value, 2, "2 was not written");
  });
});

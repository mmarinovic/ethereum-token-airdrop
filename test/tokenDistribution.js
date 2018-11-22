const TokenDistribution = artifacts.require('TokenDistribution');
const FixedSupplyToken = artifacts.require('FixedSupplyToken');

const Web3 = require('web3');
Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const moveToFuture = (time) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [time],
      id: new Date().getTime()
    }, (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    });
  })
}

const mineBlock = () => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: "2.0",
      method: "evm_mine"
    }, (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    });
  })
}
contract('TokenDistribution', (accs) => {
    const accounts = accs;
    let owner = accs[0];
    let instance, token;

    const totalSupply = 10000000;
    let remainingAllocationForDevelopers = 1000000;
    let remainingAllocationForPresale = 3000000;
    let remainingTotalSupply = totalSupply - remainingAllocationForDevelopers - remainingAllocationForPresale;

    let timeOffset = 3600 * 24 * 10; // 10 days
    let startTime = new Date().getTime() / 1000 + timeOffset;

    before(async () => {
        instance = await TokenDistribution.new(startTime, {from: owner});
        token = FixedSupplyToken.at(await instance.token());

        await moveToFuture(timeOffset + 100);
        await mineBlock();
    });

    let addresses = [];
    for(let i = 0; i<10; i++){
        addresses.push(web3.eth.accounts.create().address);
    }

    it('deploys with correct data', async() => {
      const startTime = await instance.startTime();
      const remainingTotalSupply = await instance.remainingTotalSupply();
      assert.equal(startTime.toNumber(), startTime);
      assert.equal(remainingTotalSupply.toNumber(), remainingTotalSupply);
    });

    it('non-owner owner cant airdrop', async () => {
      try{
        await instance.airdrop(addresses, {from: accounts[2]});
        assert.isTrue(false);
      }catch(e){
        assert.isTrue(true);
      }
    });

    it('owner can airdrop to many addresses', async () => {
      try{
        await instance.airdrop(addresses, {from: owner});
        assert.isTrue(true);
      }catch(e){
        assert.isTrue(false);
      }
    });

    it('addresses received tokens after airdrop', async () => {
      for(let i = 0; i < addresses.length; i++){
          let amount = await token.balanceOf(addresses[i]);
          assert.equal(amount.toString(10), "500000000000000000000");
      }
    });

    it('addreses marked as airdroped after airdrop', async () => {
      for(let i = 0; i < addresses.length; i++){
        let isAirdroped = await instance.airdrops(addresses[i]);
        assert.isTrue(isAirdroped);
      }
    });

    it('remaining airdrop supply decreesed after airdrop', async () => {
      const remainingTotalSupplyOnContract = await instance.remainingTotalSupply({from: owner});
      const expectedTotalSupply = remainingTotalSupply - (addresses.length * 500);
      assert.equal(remainingTotalSupplyOnContract.toNumber(), expectedTotalSupply);
    });

    it('owner cant airdrop to same addresses again', async () => {
      await instance.airdrop(addresses, {from: owner});
      for(let i = 0; i < addresses.length; i++){
        let amount = await token.balanceOf(addresses[i]);
        assert.equal(amount.toString(10), "500000000000000000000");
      }
    });
});
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
    
    let timeOffset = 3600 * 24 * 10; // 10 days
    let startTime = new Date().getTime() / 1000 + timeOffset;

    before(async () => {
        instance = await TokenDistribution.new(startTime, {from: owner});
        token = FixedSupplyToken.at(await instance.token());

        await moveToFuture(timeOffset + 1);
        await mineBlock();
    });

    it('can airdrop to many addresses', async () => {

        let addresses = [];
        for(let i = 0; i<2; i++){
            addresses.push(web3.eth.accounts.create().address);
        }

        await instance.airdrop(addresses, {from: owner});
        
        for(let i = 0; i<addresses.length; i++){
            let amount = await token.balanceOf(addresses[i]);
            assert.equal(amount.toString(10), "500000000000000000000");
        }
    });
});
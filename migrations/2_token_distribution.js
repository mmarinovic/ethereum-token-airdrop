var TokenDistribution = artifacts.require("./TokenDistribution.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenDistribution, (new Date().getTime() / 1000) + 10000);
};

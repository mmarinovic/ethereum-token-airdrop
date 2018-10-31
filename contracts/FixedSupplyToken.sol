pragma solidity ^0.4.23;

import "mmarinovic-ethereumisc/contracts/Erc20.sol";

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) external; }

contract FixedSupplyToken is Erc20 {

    string public name = "Fixed Supply Token";
    string public symbol = "FST";

    uint public decimals;
    uint public decimalFactor;
    uint public totalSupply;

    constructor(address _distributionContractAddress, uint _totalSupply, uint _decimals) public {
        require(_distributionContractAddress != address(0));
        require(_totalSupply > 0);

        decimals = _decimals;
        decimalFactor = 10 ** _decimals;
        totalSupply = 10000000 * decimalFactor;

        balanceOf[_distributionContractAddress] = totalSupply;
        emit Transfer(address(0), _distributionContractAddress, totalSupply);
    }

    function transfer(address to, uint value) public returns (bool success){
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns (bool success){
        require(value <= allowance[from][msg.sender]);

        allowance[from][msg.sender] -= value;
        _transfer(from, to, value);

        return true;
    }

    function approve(address spender, uint value) public returns (bool succes) {
        allowance[msg.sender][spender] = value;
        return true;
    }

    function approveAndCall(address spender, uint value, bytes extraData) public returns (bool success){
        tokenRecipient _spender = tokenRecipient(spender);
        if(approve(spender, value)){
            _spender.receiveApproval(msg.sender, value, this, extraData);
            return true;
        }
    }
    
    function() public payable {
        if(msg.value > 0 ){
            revert();
        }
    }

    function _transfer(address from, address to, uint value) internal{
        require(to != 0x0);
        require(balanceOf[from] >= value);
        require(balanceOf[to] + value >= balanceOf[to]);

        uint previousBalance = balanceOf[from] + balanceOf[to];

        balanceOf[from] -= value;
        balanceOf[to] += value;

        emit Transfer(from, to, value);

        assert(balanceOf[from] + balanceOf[to] == previousBalance);
    }
}

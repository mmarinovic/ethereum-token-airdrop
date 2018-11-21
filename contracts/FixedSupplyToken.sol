pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) external; }

contract FixedSupplyToken is IERC20 {

    string public name = "Fixed Supply Token";
    string public symbol = "FST";

    uint public decimals;
    uint public decimalFactor;
    uint public totalSupply;

    uint private _totalSupply;
    mapping(address => uint) private _balanceOf;
    mapping(address => mapping(address => uint)) private _allowance;

    constructor(address _distributionContractAddress, uint _totalSup, uint _decimals) public {
        require(_distributionContractAddress != address(0));
        require(_totalSup > 0);

        decimals = _decimals;
        decimalFactor = 10 ** _decimals;
        _totalSupply = _totalSup * decimalFactor;

        _balanceOf[_distributionContractAddress] = totalSupply;
        emit Transfer(address(0), _distributionContractAddress, _totalSupply);
    }

    function totalSupply() external view returns (uint256){
        return _totalSupply;
    }

    function balanceOf(address who) external view returns (uint256){
        return _balanceOf[who];
    }

    function allowance(address owner, address spender) external view returns (uint256){
        return _allowance[owner][spender];
    }

    function transfer(address to, uint value) public returns (bool success){
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns (bool success){
        require(value <= _allowance[from][msg.sender]);

        _allowance[from][msg.sender] -= value;
        _transfer(from, to, value);

        return true;
    }

    function approve(address spender, uint value) public returns (bool succes) {
        _allowance[msg.sender][spender] = value;
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
        require(_balanceOf[from] >= value);
        require(_balanceOf[to] + value >= _balanceOf[to]);

        uint previousBalance = _balanceOf[from] + _balanceOf[to];

        _balanceOf[from] -= value;
        _balanceOf[to] += value;

        emit Transfer(from, to, value);

        assert(_balanceOf[from] + _balanceOf[to] == previousBalance);
    }
}

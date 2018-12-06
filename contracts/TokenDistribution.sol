pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./FixedSupplyToken.sol";

contract TokenDistribution is Ownable{

    using SafeMath for uint256;

    uint public startTime;

    FixedSupplyToken public token;
    uint private totalSupply = 10000000;
    uint private decimals = 18;
    uint private decimalFactor = 10 ** decimals;

    uint private airdropAmount = 500;
    uint public remainingAllocationForDevelopers = 1000000;
    uint public remainingAllocationForPresale = 3000000;
    uint public remainingTotalSupply = totalSupply - remainingAllocationForDevelopers - remainingAllocationForPresale;

    mapping(address => Allocation) public allocations;
    mapping(address => bool) public airdrops;

    enum AllocationType {
        Developers,
        Presale
    }

    struct Allocation{
        uint amount;
        AllocationType allocationType;
        uint lockedUntil;
        uint amountClaimed;
    }

    event Airdrop(address indexed to, uint indexed amount);
    event AllocationClaimed(address indexed destination, uint indexed amount);

    constructor(uint _startTime) public {
        require(_startTime > now);
        token = new FixedSupplyToken(this, totalSupply, decimals);

        startTime = _startTime;
    }

    function airdrop(address[] _addresses) public onlyOwner {
        require(startTime < now);
        require(remainingTotalSupply >= airdropAmount);

        for(uint i = 0; i<_addresses.length; i++){
            address airdropAddress = _addresses[i];
            if(!airdrops[airdropAddress]){
                airdrops[airdropAddress] = true;
                remainingTotalSupply = remainingTotalSupply.sub(airdropAmount);
                require(token.transfer(airdropAddress, airdropAmount * decimalFactor));
                emit Airdrop(airdropAddress, airdropAmount);
            }
        }
    }

    function addAllocation(address _address, uint _amount, AllocationType _type, uint _lockedUntil) public onlyOwner {
        require(_address != address(0));
        require(_amount > 0);
        require(allocations[_address].amount == 0);

        if(_type == AllocationType.Developers){
            require(remainingAllocationForDevelopers >= _amount);
            remainingAllocationForDevelopers = remainingAllocationForDevelopers.sub(_amount);
        }else if(_type == AllocationType.Presale){
            require(remainingAllocationForPresale >= _amount);
            remainingAllocationForPresale = remainingAllocationForPresale.sub(_amount);
        }else{
            revert();
        }

        Allocation memory newAllocation = Allocation({
            amount: _amount,
            allocationType: _type,
            lockedUntil: _lockedUntil,
            amountClaimed: 0
        });

        allocations[_address] = newAllocation;
    }

    function withdrawAllocation(uint _amountToClaim) public {
        require(allocations[msg.sender].amount > _amountToClaim);
        require(allocations[msg.sender].lockedUntil < now);
        require(allocations[msg.sender].amount > allocations[msg.sender].amountClaimed);

        allocations[msg.sender].amountClaimed = allocations[msg.sender].amount.sub(_amountToClaim);
        require(token.transfer(msg.sender, _amountToClaim));
        emit AllocationClaimed(msg.sender, _amountToClaim);
    }

    function getState() public returns(uint startTime, uint remainingAllocationForDevelopers, uint remainingAllocationForPresale, uint remainingTotalSupply){}
}
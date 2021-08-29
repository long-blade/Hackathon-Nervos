pragma solidity ^0.8.3;

contract Bank {
    mapping(address => uint256) accounts;
    
    modifier hasFands(uint256 _amount) {
        require(accounts[msg.sender] >= _amount, "Insufficient funds");
        _;
    }
    
    function deposit() public payable {
        accounts[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 _amount) public hasFands(_amount) {
        payable(msg.sender).transfer(_amount);
        accounts[msg.sender] -= _amount;
    }
    
    function bankReport() public view returns(uint256){
        return address(this).balance;
    }
}

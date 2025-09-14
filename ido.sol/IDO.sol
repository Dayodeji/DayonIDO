// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SimpleIDO is Ownable {
    IERC20 public tokenA = IERC20(0xcB1FFB30ee3774Ff9d899bF633F0cEe5bDC373c8); // Token being sold
    IERC20 public tokenB = IERC20(0xDd7639e3920426de6c59A1009C7ce2A9802d0920); // Payment token
    uint256 public rate = 100; // Example: 1 Token B = 100 Token A
    uint256 public tokensSold;

    event TokensPurchased(address indexed buyer, uint256 amountB, uint256 amountA);

    // Buy Token A with Token B
    function buyTokenAWithTokenB(uint256 amountB) external {
        require(amountB > 0, "Amount must be greater than zero");

        // Transfer Token B from user to contract
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Token B transfer failed");

        // Calculate amount of Token A to send
        uint256 amountA = amountB * rate;

        require(tokenA.balanceOf(address(this)) >= amountA, "Not enough Token A in contract");

        // Transfer Token A to user
        require(tokenA.transfer(msg.sender, amountA), "Token A transfer failed");

        tokensSold += amountA;

        emit TokensPurchased(msg.sender, amountB, amountA);
    }

    // Owner can withdraw Token B
    function withdrawTokenB(uint256 amount) external onlyOwner {
        require(tokenB.transfer(msg.sender, amount), "Withdraw failed");
    }

    // Owner can withdraw unsold Token A
    function withdrawUnsoldTokenA() external onlyOwner {
        uint256 balance = tokenA.balanceOf(address(this));
        require(tokenA.transfer(msg.sender, balance), "Withdraw failed");
    }

    // Owner can set rate
    function setRate(uint256 newRate) external onlyOwner {
        require(newRate > 0, "Invalid rate");
        rate = newRate;
    }
}

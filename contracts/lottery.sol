// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * 
 * 
 */

contract Lottery {

    address payable[] public lotteryPlayers;
    mapping(address => uint) depositBalance;
    address public manager;

    receive() external payable {


    }

    fallback() external payable {

    }

    constructor() {
        manager = msg.sender;
    }

    function getBalance() public view returns(uint) {
        require (msg.sender == manager, "Not the Manager");
        return address(this).balance;

        }
    function depositLottery() public payable returns(uint) {
        require(msg.value >= 0.1 ether, "Insufficient Balance");
        lotteryPlayers.push(payable(msg.sender));
        return depositBalance[msg.sender] += msg.value;
    }

    function randomPlayers() internal view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, lotteryPlayers.length)));
    }

    function transferLottery() public {
        require (msg.sender == manager, "Not the Manager");
        require(lotteryPlayers.length >= 10, "Players should be at least 10");
        // require(msg.value >= 1.5 ether, "Insufficient Transfer Balance");

        uint randomLottery = randomPlayers();
        address payable lotteryWinner;

         uint index = randomLottery % lotteryPlayers.length;

        lotteryWinner = lotteryPlayers[index];
        lotteryWinner.transfer(getBalance());
         lotteryPlayers = new address payable[](0);

    }

    // 0xae394eab81d4c1a7f7b7b8840fcd82e08c32c2d58cc15813a9966dc0dea6ef15 - SMART CONTRACT









}
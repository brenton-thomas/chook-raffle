// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

//import "hardhat/console.sol";


/// @custom:security-contact security@brentonthomas.com

contract Warchest is ERC20, ERC20Permit {

    constructor() ERC20("ChookRaffle", "CHOOK") ERC20Permit("ChookRaffle") {

        require(18 == decimals(), "Decimals must be 18");

        super._mint(msg.sender, 0);
    }
}
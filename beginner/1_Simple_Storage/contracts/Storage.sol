// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Storage {
    /* To know how many times the name has changed */
    uint public counter;
    string public name;

    event SetName(uint counter, string name);

    function setName(string calldata _name) public {
        counter = counter + 1;
        name = _name;
        emit SetName(counter, name);
    }

}
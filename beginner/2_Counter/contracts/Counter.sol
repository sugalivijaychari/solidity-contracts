// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Counter {
    int public count;

    event Increment(int count);
    event Decrement(int count);
    event Reset(int count);
    event Modify(int count);

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
        emit Increment(count);
    }

    function decrement() public {
        count -= 1;
        emit Decrement(count);
    }

    function reset() public {
        count = 0;
        emit Reset(count);
    }

    function modify(int _count) public {
        count = _count;
        emit Modify(count);
    }
}

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Counter", function () {
  async function deployCounterFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Counter = await hre.ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the initial count to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.count()).to.equal(0);
    });
  });

  describe("Increment", function () {
    it("Should increment the count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();
      expect(await counter.count()).to.equal(1);
    });
  });

  describe("Decrement", function () {
    it("Should decrement the count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment(); // Increment first to avoid negative count
      await counter.decrement();
      expect(await counter.count()).to.equal(0);
    });
  });

  describe("Reset", function () {
    it("Should reset the count to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();
      await counter.reset();
      expect(await counter.count()).to.equal(0);
    });
  });

  describe("Modify", function () {
    it("Should modify the count to a specific value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.modify(42);
      expect(await counter.count()).to.equal(42);
    });
  });

  describe("Events", function () {
    it("Should emit Increment event on increment", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await expect(counter.increment())
        .to.emit(counter, "Increment")
        .withArgs(1);
    });

    it("Should emit Decrement event on decrement", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment(); // Increment first to avoid negative count
      await expect(counter.decrement())
        .to.emit(counter, "Decrement")
        .withArgs(0);
    });

    it("Should emit Reset event on reset", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();
      await expect(counter.reset())
        .to.emit(counter, "Reset")
        .withArgs(0);
    });

    it("Should emit Modify event on modify", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await expect(counter.modify(42))
        .to.emit(counter, "Modify")
        .withArgs(42);
    });
  });
});

import { Storage } from "../typechain-types";
import { expect } from "chai";
import hre from "hardhat";

describe("Simple Storage", function () {
  let storage: Storage;

  before(async function () {
    const Storage = await hre.ethers.getContractFactory("Storage");
    const storageContract = await Storage.deploy();
    storage = storageContract;
  });

  describe("Deployment", function () {
    it("Should deploy the contract successfully", async function () {
      expect(storage.target).is.not.null;
    });

    it("Should initialize with a counter of 0 and empty name", async function () {
      const initialCounter = await storage.counter();
      const initialName = await storage.name();

      expect(initialCounter).to.equal(0);
      expect(initialName).to.equal("");
    });
  });

  describe("Store name", function () {
    it("Should store name", async function () {
      const name = "Vijay Sugali";
      await expect(storage.setName(name)).not.to.be.reverted;
      expect(await storage.name()).to.equal(name);
    });
    it("Should increase the existing counter by 1", async function () {
      expect(await storage.counter()).to.equal(1);
    });
  });

  describe("Events", function () {
    it("Should emit an event on set name", async function () {
      const updatedName = "Ajay Sugali";

      await expect(storage.setName(updatedName))
        .to.emit(storage, "SetName")
        .withArgs(2, updatedName);
    });
  });
});

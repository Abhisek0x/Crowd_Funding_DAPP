const { assert } = require("chai")
const { ethers, network, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Fundme", async () => {
          let fundMe
          let deployer
          let sendValue = ethers.utils.parseEther("1")
          beforeEach(async () => {
              deployer = (await getNamedAcccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw from Fundme", async () => {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endBalance = fundMe.provider.getBalance(fundMe.address)
              assert.equal(endBalance.toString(), "0")
          })
      })

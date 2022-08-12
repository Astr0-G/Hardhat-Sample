// function deployFunc(hre) {
//     console.log("hi")
// }

// module.exports.default = deployFunc
const {
    networkConfig,
    developmentChains,
    get,
} = require("../helper-hardhat-config")
const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let ethUsdPriceAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await get("MockV3Aggregator")
        ethUsdPriceAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // const ethUsdPriceAddress = ""

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceAddress],
        log: true,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
    }
    log("------------------------------")
}
module.exports.tags = ["all", "fundMe"]

const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "myself poet rifle spike panther amateur amateur music can crash elbow kangaroo";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/82c8cc7e3c30437e87d724ad04bb4818`),
      network_id: 4,       
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },
  mocha: {
      // timeout: 100000
    },

  // Configure your compilers
  compilers: {
    solc: {
    }
  }
}

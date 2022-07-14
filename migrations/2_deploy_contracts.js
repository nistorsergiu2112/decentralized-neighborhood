// migrating the appropriate contracts
const Verifier = artifacts.require("Verifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer, accounts) {
    deployer.deploy(Verifier)
    .then(() => {
        return deployer.deploy(SolnSquareVerifier, 'Metaverse Random Properties', 'MRP');
    })
};

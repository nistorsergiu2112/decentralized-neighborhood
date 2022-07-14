// migrating the appropriate contracts
const CustomERC721Mintable = artifacts.require("CustomERC721Mintable");
const Verifier = artifacts.require("Verifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer, accounts) {
    deployer.deploy(CustomERC721Mintable, 'Minecraft First House', 'MCFT');
    deployer.deploy(Verifier)
    .then(() => {
        return deployer.deploy(SolnSquareVerifier, 'Minecraft First House', 'MCFT');
    })
};

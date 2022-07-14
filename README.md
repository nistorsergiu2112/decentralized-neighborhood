# Udacity Blockchain Capstone ( NFT Marketplace )

In this project you will be minting your own tokens to represent your title to the properties. Before you mint a token, you need to verify you own the property. You will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property.

##Tech stack used in this project:
Solidity(smart contracts) ~ Truffle (testing/tooling) ~ Ganache(local blockchain) ~ Infura(Deploying) ~ OpenZeppelin(Contracts) - OpenSea(Marketplace)
ZoKrates(Succinct Zero-Knowledge proofs) - Remix(Env for Zokrates)

## OpenSea Marketplace
Link to marketplace -> https://testnets.opensea.io/collection/metaverse-random-properties

## Development instructions:

### Installing
```
- git clone https://github.com/nistorsergiu2112/decentralized-neighborhood
- cd into project folder
- npm install
Setup Ganache
- truffle compile
- truffle migrate
- truffle test ( all tests should pass from start )
```
For Rinkeby migration:
Create mnemonic and infura key, then ->
```
truffle migrate --reset --network rinkeby --compile-all
```
### Contract Interaction
My deployed contract can be found at https://rinkeby.etherscan.io/address/0xf46853d711edfb4cca90f60ceeecb1d78c056ec9
Interact with the contract using https://www.myetherwallet.com/
### Generating Zokrates Proof
use article : https://medium.com/coinmonks/zokrates-zksnarks-on-ethereum-made-easy-8022300f8ba6
or use my Verifier.sol with Remix to generate Proofs.
Zokrates square verifier code:
```
def main(private field a, field b) -> (field):
  field result = if a * a == b then 1 else 0 fi
  return result
```
# Project Resources

* [EtherWallet](https://www.myetherwallet.com/)
* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

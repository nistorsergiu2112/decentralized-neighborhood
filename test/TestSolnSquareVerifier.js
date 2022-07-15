const SolnSquareVerifierContract = artifacts.require('SolnSquareVerifier');
const proof = require('./../zokrates/code/proof.json');

contract('SolnSquareVerifier Verificator', accounts => {
    const owner_account = accounts[0];

    const name_one = 'random-test-token1';
    const symbol_one = 'RTT';

    describe('new solution can be added test' , function () {
        beforeEach(async () => {
            this.contract = await SolnSquareVerifierContract.new(name_one, symbol_one);
        })
        
        it ('should add a new solution and mint a new token for contract', async () => {
            let error;

            try {
                await this.contract.mintVerifySol(owner_account, 1, proof.proof, proof.inputs);
            } catch (err) {
                error = err;
            }

            const tokenBalance    = await this.contract.balanceOf.call(owner_account);
            const solutionsNumber = await this.contract.getSolutionsNumber.call();

            assert.equal(error, null, 'There should not be an error');
            assert.equal(tokenBalance, 1, 'Minting was unsuccesfull');
            assert.equal(solutionsNumber.toNumber(), 1, 'Solution was not added');
        });

        it('ERC721 token cant be minted using the same solution', async () => {
            let error;

            await this.contract.mintVerifySol(owner_account, 1, proof.proof, proof.inputs);

            try {
                await this.contract.mintVerifySol(owner_account, 2, proof.proof, proof.inputs);
            } catch (err) {
                error = err;
            }

            const tokenBalance = await this.contract.balanceOf.call(owner_account);

            assert.notEqual(error, null, 'There should be an error for trying to duplicate mint');
            assert.notEqual(tokenBalance, 2, 'Duplicate minting was allowed');
        });

    })
})

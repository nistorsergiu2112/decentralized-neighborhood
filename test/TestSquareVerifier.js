const verifier = artifacts.require('Verifier');
const proof = require('./../zokrates/code/proof.json');

contract('Verifier', accounts => {

    const account = accounts[0];

    describe('Verifier verification', function () {
        beforeEach(async function () { 
            this.contract = await verifier.new({from: account});
        })

        // This verifies zokrates proof
        it('should pass verifyTx with correct proof', async function () { 
            const result = await this.contract.verifyTx.call(proof.proof, proof.inputs);

            assert.equal(result, true, "Verification did not pass");
        });

        // This verifies contract fails with incorrect proof
        it('should fail verifyTx with incorrect proof', async function () {
            const result = await this.contract.verifyTx.call(proof.proof, [5,9]);
            
            assert.equal(result, false, "Verification passed when expected to fail");
        });
    });
})

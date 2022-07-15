var ERC721MintableComplete = artifacts.require('CustomERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    const name = 'MinecraftHouse';
    const symbol = 'MCFT';

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1,{from: account_one});
            await this.contract.mint(account_one, 2,{from: account_one});
            await this.contract.mint(account_two, 3,{from: account_one});
            await this.contract.mint(account_two, 4,{from: account_one});
        })

        it('should return total supply', async function () { 
            const totalSupply = await this.contract.totalSupply.call();

            assert.equal(totalSupply.toNumber(), 4, "Total supply of tokens should be equal to tokens minted");
        })

        it('should get token balance', async function () { 
            const balanceContract0 = await this.contract.balanceOf(account_one);
            const balanceContract1 = await this.contract.balanceOf(account_two);

            assert.equal(balanceContract0.toNumber(), 2, "Token balance of address 0 is incorrect");
            assert.equal(balanceContract1.toNumber(), 2, "Token balance of address 1 is incorrect");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const contractTokenUri = await this.contract.tokenURI.call(1);
            const expectedTokenUri = `https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1`;
      
            assert.equal(contractTokenUri, expectedTokenUri, "Token uri is not the expected value");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 1, {from: account_one})

            const newOwner = await this.contract.ownerOf.call(1);
            assert.equal(newOwner, account_two, "Transfer failed, new owner is not the right owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let error;
            try {
              await this.contract.mint(account_three, 3, { from: account_three });
            } catch (err) {
              error = err;
            }
            assert.notEqual(error, null, "This error means that minting restrictions are broken or too permissive");
        })

        it('should return contract owner', async function () { 
            const owner = await this.contract.getOwner.call();

            assert.equal(owner, account_one, "Owner should be account 0");
        })

    });
})
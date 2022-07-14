pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <0.6.0;

import './Verifier.sol';
import './ERC721Mintable.sol';

contract SolnSquareVerifier is CustomERC721Mintable {
    Verifier verifierContract;

    constructor(string memory name, string memory symbol) CustomERC721Mintable(name, symbol) public {
        verifierContract = new Verifier();
    }

    struct Solutions {
        uint256 index;
        address verifierAddress;
    }

    Solutions[] private solutionsArray;
    uint256 private solutionsCount = 0;
    mapping(bytes32 => Solutions) private uniqueSolutions;

    event CreateSolution(uint256 index, address verifierAddress);

    function createSolution(uint256 index, address verifierAddress, bytes32 key) internal {
        require(uniqueSolutions[key].verifierAddress == address(0), 'Solution is not unique');
        solutionsCount = solutionsCount.add(1);
        Solutions memory newSolution = Solutions(index, verifierAddress);
        solutionsArray.push(newSolution);
        uniqueSolutions[key] = newSolution;

        emit CreateSolution(index, verifierAddress);
    }

    function getSolutionsNumber() public view returns(uint256) {
        return solutionsCount;
    }

    function mintVerifySol(
        address to,
        uint256 tokenId,
        Verifier.Proof memory proof, 
        uint[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encode(proof.a, proof.b, proof.c, input));
        bool solutionResult = verifierContract.verifyTx(proof, input);

        require(uniqueSolutions[key].verifierAddress == address(0), 'Solution is not unique');
        require(solutionResult == true, "Proof is not valid");

        createSolution(tokenId, to, key);
        super.mint(to, tokenId);
    }
}

  



























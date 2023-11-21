//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;

    mapping(address => bool) public hasVoted;
    mapping(address => string) public voterChoice;
    mapping(address => mapping(bytes32 => bool)) public voteRecords;

    event Voted(address indexed voter, string indexed candidate);

    constructor() {
        candidates.push(Candidate("Candidate 1", 0));
        candidates.push(Candidate("Candidate 2", 0));
        candidates.push(Candidate("Candidate 3", 0));
        candidates.push(Candidate("Candidate 4", 0));
    }

    function vote(
        string memory candidateName
    ) public returns (string memory, bytes32) {
        bool validCandidate = false;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(bytes(candidates[i].name)) ==
                keccak256(bytes(candidateName))
            ) {
                validCandidate = true;
                break;
            }
        }

        require(validCandidate, "Invalid candidate name");
        require(!hasVoted[msg.sender], "You have already voted");

        bytes32 h1 = keccak256(abi.encodePacked(msg.sender, candidateName));
        voteRecords[msg.sender][h1] = true;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(bytes(candidates[i].name)) ==
                keccak256(bytes(candidateName))
            ) {
                candidates[i].voteCount++;
                hasVoted[msg.sender] = true;
                voterChoice[msg.sender] = candidateName;
                emit Voted(msg.sender, candidateName);
                return ("your voted unquie address: ", h1);
            }
        }
        return ("your voted unquie address: ", h1);
    }

    function getVoteCount(
        string memory candidateName
    ) public view returns (uint256) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(bytes(candidates[i].name)) ==
                keccak256(bytes(candidateName))
            ) {
                return candidates[i].voteCount;
            }
        }
        revert("Invalid candidate name");
    }

    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }

    function checkVote(
        address userAddress,
        string memory candidateName
    ) public view returns (string memory, bytes32, bytes32) {
        bytes32 h2 = keccak256(abi.encodePacked(userAddress, candidateName));

        bytes32 h1 = keccak256(
            abi.encodePacked(userAddress, voterChoice[userAddress])
        );

        if (voteRecords[userAddress][h1] && h1 == h2) {
            return ("Vote is correctly casted", h1, h2);
        } else {
            return ("Vote is not correctly casted or check your input", h1, h2);
        }
    }
}

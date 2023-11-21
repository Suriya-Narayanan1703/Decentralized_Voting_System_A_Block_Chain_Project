// Replace 'YourContractAddress' and 'YourContractABI' with actual values
const contractAddress = "0xe6dDc61c8E31104aB7bf6505F583aAb5Fe198c66";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "candidateName",
        type: "string",
      },
    ],
    name: "vote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "candidate",
        type: "string",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "candidateName",
        type: "string",
      },
    ],
    name: "checkVote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidateCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "candidateName",
        type: "string",
      },
    ],
    name: "getVoteCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voterChoice",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "voteRecords",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let web3;
let contractInstance;

// Function to initialize Web3
async function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      initContract();
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
    initContract();
  } else {
    console.error("No web3 detected. Please install MetaMask");
  }
}

// Function to initialize Contract instance
function initContract() {
  contractInstance = new web3.eth.Contract(contractABI, contractAddress);
}

// Function to cast vote
async function castVote() {
  const voterAddress = document.getElementById("voterAddress").value;
  const candidateName = document.getElementById("candidateName").value;

  try {
    const result = await contractInstance.methods
      .vote(candidateName)
      .send({ from: voterAddress });
    console.log(result);
    document.getElementById("voteHash").value =
      result.events.Voted.returnValues[1]; // Assuming h1 is returned as the second parameter
  } catch (error) {
    console.error("Error casting vote:", error);
  }
}

// Function to check if the vote is correctly casted
async function checkVote() {
  const voterAddress = document.getElementById("voterAddress").value;
  const checkCandidateName =
    document.getElementById("checkCandidateName").value;

  try {
    const result = await contractInstance.methods
      .checkVote(voterAddress, checkCandidateName)
      .call();
    console.log(result);
    // Display the vote status or perform required action with the result
  } catch (error) {
    console.error("Error checking vote:", error);
  }
}

// Function to get vote count for a candidate
async function getCandidateVoteCount() {
  const candidateName = document.getElementById("candidateName").value;

  try {
    const result = await contractInstance.methods
      .getVoteCount(candidateName)
      .call();
    console.log(result);
    document.getElementById("candidateVoteCount").value = result;
  } catch (error) {
    console.error("Error getting vote count:", error);
  }
}

// Initialize Web3 and Contract on window load
window.onload = function () {
  initWeb3();
};

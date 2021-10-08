import { useState } from "react";
// import { sha256 } from "js-sha256";
import Erc20Abi from "./ERC20.json";
import BridgeAbi from "./Bridge.json";
import ClaimTestToken from "./ClaimTestToken.json";
import { ethers } from "ethers";
import { actorFactory } from "../canisters/actorFactory";

import { _SERVICE as DfinityDepositInterface } from "../canisters/bridge/Bridge.did";
import { idlFactory as bridgeIdlFactory } from "../canisters/bridge/did";

import { _SERVICE as DfinityDftInterface } from "../canisters/dft/dft_rs.did";
import { idlFactory as dftFactory } from "../canisters/dft/did";

declare const window: any;

export interface DepositInterface {
  approvalOfDfinity: () => void;
  depositOfDfinity: () => void;
  depositOfBsc: () => void;
  erc20Approval: () => void;
  setApproval: (arg0: boolean) => void;
  calculateGas: (arg0: number) => void;
  claimTestToken: () => void;
  approvalBsc: boolean;
}

export interface CallData {'method' : string, 'args' : Array<number>}

export interface depositDataInterface {
  bridgeAddress: string;
  fromChainID: number;
  toChainID: number;
  tokenAddress: string;
  inputAmount: number;
  recipientAddress: string;
  decimals: number;
  walletAddress: string;
}

export const DepositTool = () => {
  const [approvalBsc, setApprovalBsc] = useState(false)
  

  /* -------------------------- dfinity deposit start --------------------- */
  const depositOfDfinity = (depositData: depositDataInterface) => {
    console.table(depositData)
    let resourceID = depositData.bridgeAddress + depositData.fromChainID
    const createDfinityTool = (CANISTER_ID) => actorFactory.createActor<DfinityDepositInterface>(bridgeIdlFactory,CANISTER_ID);
    return new Promise(async (resolve, reject) => {
      createDfinityTool(depositData.bridgeAddress).deposit(
        resourceID,
        depositData.toChainID,
        {
          recipientAddress: depositData.recipientAddress,
          amount: BigInt(depositData.inputAmount) * (BigInt(10) ** BigInt(depositData.decimals))
        }
      ).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }

  /* ------------------------------ dfinity Approval start ----------------------------- */
  const approvalOfDfinity = (depositData: depositDataInterface) => {
    console.table(depositData)
    const createDfinityTool = (CANISTER_ID) => actorFactory.createActor<DfinityDftInterface>(dftFactory,CANISTER_ID);
    return new Promise(async (resolve, reject) => {
      createDfinityTool(depositData.bridgeAddress).approve(
        [],
        depositData.bridgeAddress,
        BigInt(depositData.inputAmount) * (BigInt(10) ** BigInt(depositData.decimals)),
        []
        // type CallData = record {'method':'deposit','args':[]};
      ).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }


  /* -------------------------- bsc claimTestToken start  --------------------- */
  const claimTestToken = () => {
    console.log('claimTestToken')
    return new Promise(async (resolve, reject) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      let contract = new ethers.Contract('0xBb2919Bd1B658a7135bEb3E5430083CC126b49DF', ClaimTestToken.abi, provider);
      let contractWithSigner = contract.connect(signer);
      contractWithSigner.claim().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    });
  }

  /* -------------------------- bsc erc20Approval start  --------------------- */
  const erc20Approval = (bridgeAddress, tokenAddress, qty, decimals) => {
    console.table({ bridgeAddress: bridgeAddress, tokenAddress: tokenAddress, qty: qty, decimals: decimals })
    return new Promise(async (resolve, reject) => {
      let qtyBN = ethers.utils.parseUnits(String(qty), decimals);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Erc20Abi.abi, provider);
      const contractWithSigner = contract.connect(signer);
      contractWithSigner.approve(bridgeAddress, qtyBN).then(txRes => {
        resolve(txRes);
      }).catch(err => {
        console.log("approve error", err)
        reject(err);
      })
    });
  }

  /* -------------------------- bsc deposit start --------------------- */
  const toHex = (covertThis: ArrayLike<number> | string, padding: number) => {
    return ethers.utils.hexZeroPad(ethers.utils.hexlify(covertThis), padding);
  };

  const createResourceID = (contractAddress, chainID) => {
    chainID = Number(chainID);
    return toHex(contractAddress + toHex(chainID, 0).substr(2), 32)
  };

  const createERCDepositData = (depositAmount, recipientAddress) => {
    return '0x' +
      toHex(depositAmount, 32).substr(2) +     // Token amount or ID to deposit  (32 bytes)
      toHex('0x20', 32).substr(2) +            // len(recipientAddress)          (32 bytes)
      recipientAddress.substr(2);              // recipientAddress               (?? bytes)
  };

  const depositOfBsc = async (depositData: depositDataInterface) => {
    console.table(depositData)
    return new Promise(async (resolve, reject) => {
      let qtyBN = ethers.utils.parseUnits(String(depositData.inputAmount), depositData.decimals);
      let erc20ResourceID = createResourceID(depositData.tokenAddress, depositData.fromChainID)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(depositData.bridgeAddress, BridgeAbi.abi, provider);
      const contractWithSigner = contract.connect(signer);
      contractWithSigner.deposit(
        depositData.toChainID,
        erc20ResourceID,
        createERCDepositData(qtyBN, depositData.recipientAddress)
      ).then((res) => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  }

  const calculateFee = (amount) => {
    // const rate = 1 / 1000;
    // let fee = amount * rate;
    return 0;
  }
  return {
    approvalOfDfinity,
    depositOfBsc,
    depositOfDfinity,
    calculateFee,
    erc20Approval,
    setApprovalBsc,
    claimTestToken,
    approvalBsc: approvalBsc
  }
}



/*
  const createContractWithSigner = (bridgeAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(bridgeAddress, Erc20Abi.abi, provider);
    const contractWithSigner = contract.connect(signer);
    return contractWithSigner
  }
*/
/*
  // -------------------------- bsc voteOfBsc start ---------------------
  const voteOfBsc = (depositData: depositDataInterface) => {
    return new Promise(async (resolve, reject) => {
      let erc20ResourceID = createResourceID(depositData.tokenAddress, depositData.fromChainID)
      let dataHash = sha256(depositData.recipientAddress)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(depositData.bridgeAddress, Erc20Abi.abi, provider);
      const contractWithSigner = contract.connect(signer);
      contractWithSigner.voteProposal(
        depositData.fromChainID,
        erc20ResourceID,
        dataHash
      ).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    });
  } */
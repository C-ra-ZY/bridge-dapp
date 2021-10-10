import { useState } from "react";
// import { sha256 } from "js-sha256";
import Erc20Abi from "./ERC20.json";
import BridgeAbi from "./Bridge.json";
import ClaimTestToken from "./ClaimTestToken.json";
import { ethers, BigNumber, utils } from "ethers";
import { IDL } from "@dfinity/candid";
import { actorFactory } from "../canisters/actorFactory";

import { _SERVICE as DfinityDepositInterface } from "../canisters/bridge/Bridge.did";
import { idlFactory as bridgeIdlFactory } from "../canisters/bridge/did";

import { _SERVICE as DfinityDftInterface } from "../canisters/dft/dft_rs.did";
import { idlFactory as dftIdlFactory } from "../canisters/dft/did";

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

// export interface CallData { 'method': string, 'args': Array<number> }

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
    const createDfinityTool = (CANISTER_ID) => actorFactory.createActor<DfinityDepositInterface>(bridgeIdlFactory, CANISTER_ID);
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
   const buildCallData = (method: String, ...args: Array<any>) => {
    const depositDataType = IDL.Record({
      'recipientAddress': IDL.Text,
      'amount': IDL.Nat,
    });
    const argTypes: Array<IDL.Type<any>> = [IDL.Text, IDL.Nat16, depositDataType];
    const encodeArgs = IDL.encode(argTypes, args);
    return {
      'method': method,
      'args': encodeArgs
    }
  }

  const SUB_ACCOUNT_ZERO = Buffer.alloc(32);
  const DEFAULT_SUB_ACCOUNT_ZERO = Array.from(
    new Uint8Array(SUB_ACCOUNT_ZERO)
  );
  const approvalOfDfinity = (depositData: depositDataInterface) => {
    console.table(depositData)
    let resourceID = depositData.bridgeAddress + depositData.fromChainID
    const createDfinityTool = (CANISTER_ID) => actorFactory.createActor<DfinityDftInterface>(dftIdlFactory, CANISTER_ID);
    return new Promise(async (resolve, reject) => {
      createDfinityTool(depositData.bridgeAddress).approve(
        [DEFAULT_SUB_ACCOUNT_ZERO],
        depositData.bridgeAddress,
        BigInt(depositData.inputAmount) * (BigInt(10) ** BigInt(depositData.decimals)),
        []
        // buildCallData('deposit',[resourceID,depositData.toChainID])
      ).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  }

  /* -------------------------- bsc claimTestToken start  --------------------- */
  // 0x12e70d1e994250EC6aDa292120E9596FFa4039ba local
  // 0x7415E776B809Cc75E1780A0339c015bb0208dA33
  const claimTestToken = () => {
    console.log('claimTestToken')
    return new Promise(async (resolve, reject) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      let contract = new ethers.Contract('0x3cEA2619AbD37A9480C6372fEa7160830F340E89', ClaimTestToken.abi, provider);
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
      contractWithSigner.approve('0x7a22AF7F0226718f768593f8BFa54b9a23F1D636', qtyBN).then(txRes => {
        resolve(txRes);
      }).catch(err => {
        console.log("approve error", err)
        reject(err);
      })
    });
  }

  /* -------------------------- bsc deposit start --------------------- */
  const toHex = (covertThis: any, padding: number) => {
    return ethers.utils.hexZeroPad(covertThis, padding);
  };
  const createResourceID = (contractAddress, chainID) => {
    return toHex(contractAddress + toHex(chainID, 2).substr(4), 32)
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
      const data =
        "0x" +
        utils.hexZeroPad(BigNumber.from(qtyBN).toHexString(), 32).substr(2) +
        utils.hexZeroPad(utils.hexlify((depositData.recipientAddress.length - 2) / 2), 32).substr(2) +
        depositData.recipientAddress.substr(2);
      contractWithSigner.deposit(
        depositData.toChainID,
        erc20ResourceID,
        data
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
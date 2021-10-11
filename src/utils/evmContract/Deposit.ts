import { useState } from "react";
// import { sha256 } from "js-sha256";
import Erc20Abi from "./ERC20.json";
import BridgeAbi from "./Bridge.json";
import ClaimTestToken from "./ClaimTestToken.json";
import { ethers, BigNumber, utils } from "ethers";
import { IDL } from "@dfinity/candid";
import { actorFactory } from "../canisters/actorFactory";

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


  /* ------------------------------ dfinity Approval start ----------------------------- */
  const buildCallData = (method: string, ...args: Array<any>) => {
    const depositDataType = IDL.Record({
      'recipientAddress': IDL.Text,
      'amount': IDL.Nat,
    });
    const argTypes: Array<IDL.Type<any>> = [IDL.Text, IDL.Nat16, depositDataType];
    const encodeArgs = IDL.encode(argTypes, args);
    return {
      method: method,
      args: Array.from(new Uint8Array(encodeArgs.buffer))
    }
  }
  // export interface CallData { 'method': string, 'args': Array<number> }
  const SUB_ACCOUNT_ZERO = Buffer.alloc(32);
  const DEFAULT_SUB_ACCOUNT_ZERO = Array.from(
    new Uint8Array(SUB_ACCOUNT_ZERO)
  );
  const approvalOfDfinity = (depositData: depositDataInterface) => {
    console.table(depositData)
    let resourceID = depositData.bridgeAddress + depositData.fromChainID
    let calldata = buildCallData(
      'deposit',
      resourceID,
      depositData.toChainID,
      {
        recipientAddress: depositData.recipientAddress,
        amount: BigInt(depositData.inputAmount) * (BigInt(10) ** BigInt(depositData.decimals))
      }
    )

    const createDfinityTool = (CANISTER_ID) => actorFactory.createActor<DfinityDftInterface>(dftIdlFactory, CANISTER_ID);
    return new Promise(async (resolve, reject) => {
      createDfinityTool(depositData.tokenAddress).approve(
        [DEFAULT_SUB_ACCOUNT_ZERO],
        depositData.tokenAddress,
        BigInt(depositData.inputAmount) * (BigInt(10) ** BigInt(depositData.decimals)),
        [calldata]
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
      let contract = new ethers.Contract('0x842517265677970D8A7F2D409e25E02e959220e8', ClaimTestToken.abi, provider);
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
    const handlerAddress = '0x82F24c9Ad55B20BDd2eaB8AD892032ee506aE490';
    console.table({
      bridgeAddress: bridgeAddress,
      tokenAddress: tokenAddress,
      handlerAddress: handlerAddress,
      qty: qty,
      decimals: decimals
    })

    return new Promise(async (resolve, reject) => {
      let qtyBN = ethers.utils.parseUnits(String(qty), decimals);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Erc20Abi.abi, provider);
      const contractWithSigner = contract.connect(signer);
      contractWithSigner.approve(handlerAddress, qtyBN).then(txRes => {
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

        console.log('resourceID',erc20ResourceID)
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
    calculateFee,
    erc20Approval,
    setApprovalBsc,
    claimTestToken,
    approvalBsc: approvalBsc
  }
}

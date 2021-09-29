import { useState } from "react";
import DfinityAbi from "../canisters/bridge/Bridge.json";
import Erc20Abi from "./ERC20.json";
import { ethers } from "ethers";
import { actorFactory } from "../canisters/actorFactory";
import { _SERVICE as DfinityDepositInterface } from "../canisters/bridge/Bridge.did";
import { idlFactory } from "../canisters/bridge/did";
declare const window: any;

export interface DepositInterface {
  depositOfDfinity: () => void;
  depositOfBsc: () => void;
  erc20Approval: () => void;
  setApproval: (arg0: boolean) => void;
  calculateGas: (arg0: number) => void;
  approval: boolean;
}
export interface depositDataInterface{
  bridgeAddress: string;
  fromChainID:number;
  toChainID: number;       
  tokenAddress: string;
  inputAmount: number;
  recipientAddress: string;
  decimals: number;
  walletAddress: string;
}

export const Deposit = () => {
  const [approval, setApproval] = useState(false)

  /* -------------------------- dfinity deposit start --------------------- */
  const createDfinityDepositTool = (CANISTER_ID) => actorFactory.createActor<DfinityDepositInterface>(idlFactory, CANISTER_ID);
  const depositOfDfinity = (depositData:depositDataInterface) => {
    let resourceID = depositData.bridgeAddress + depositData.fromChainID
    return new Promise(async (resolve, reject) => {
      createDfinityDepositTool(depositData.bridgeAddress).deposit(
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

  /* -------------------------- bsc erc20Approval start  --------------------- */
  const erc20Approval = (bridgeAddress, tokenAddress, qty, decimals) => {
    console.table({ bridgeAddress: bridgeAddress, tokenAddress: tokenAddress, qty: qty, decimals: decimals })
    return new Promise(async (resolve, reject) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let qtyBN = ethers.utils.parseUnits(String(qty), decimals);
      const signer = provider.getSigner();
      let erc20 = new ethers.Contract(tokenAddress, Erc20Abi.abi, provider);
      const erc20Signer = erc20.connect(signer);
      erc20Signer.approve(bridgeAddress, qtyBN).then(txRes => {
        resolve(txRes);
      }).catch(err => {
        console.log("approve error", err)
        reject(err);
      })
    });
  }

  /* -------------------------- bsc deposit start --------------------- */
  const toHex = (covertThis: ArrayLike<number> | string, padding:number) => {
    
    if (covertThis.length > 2 * padding + 2) {
      console.log("error1111")
  }
  let t = ethers.utils.hexlify(covertThis);
    return ethers.utils.hexZeroPad(t, padding);
  };
  const createResourceID = (contractAddress, chainID) => {
    chainID=Number(chainID);
    let test = toHex(chainID, 0).substr(2)
    return toHex(contractAddress + test, 32)
  };
  const createERCDepositData = (depositAmount, recipientAddress) => {
    return '0x' +
      toHex(depositAmount, 32).substr(2) +     // Token amount or ID to deposit  (32 bytes)
      toHex('0x20', 32).substr(2) +                // len(recipientAddress)          (32 bytes)
      recipientAddress.substr(2);              // recipientAddress               (?? bytes)
  };
  const depositOfBsc = async (depositData) => {
    console.table('depositOfBsc',depositData)
    let bridgeAddress = depositData.bridgeAddress;
    let recipientAddress = depositData.recipientAddress;
    let tokenAddress = depositData.tokenAddress;
    let fromChainID = depositData.fromChainID;
    let toChainID = depositData.toChainID;
    let inputAmount = depositData.inputAmount;
    let decimals = depositData.decimals;
    return new Promise(async (resolve, reject) => {
      let qtyBN = ethers.utils.parseUnits(String(inputAmount),decimals);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      let contract = new ethers.Contract(bridgeAddress, DfinityAbi.abi, provider);
      let contractWithSigner = contract.connect(signer);
      let erc20ResourceID = createResourceID(tokenAddress, fromChainID)
      contractWithSigner.deposit(toChainID, erc20ResourceID, createERCDepositData(qtyBN, recipientAddress)).then((res) => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  }

  const calculateFee = (amount) => {
    const rate = 1 / 1000;
    let fee = amount * rate;
    return 0;
  }
  return {
    depositOfBsc,
    depositOfDfinity,
    calculateFee,
    erc20Approval,
    setApproval,
    approval: approval
  }
}
import React, { useContext, useState } from "react";

interface DepositTokenInterface {
  fromChain:string,
  toChain:string,
  fromChainList:any,
  toChainList:any,
  tokens:any,
  symbol:string,
  bridgeAddress:string,
  tokenAddress:string,
  decimals:any,
  fromChainID:any,
  toChainID:any,
  toBridgeAddress:string,
  inputAmount:number,
  recipientAddress:string,
  setFromChain:(arg0: string)=>void;
  setToChain:(arg0: string)=>void;
  setFromChainList:(arg0: any)=>void;
  setToChainList:(arg0: any)=>void;
  setTokens:(arg0: any)=>void;
  setSymbol:(arg0: string)=>void;
  setBridgeAddress:(arg0: any)=>void;
  setTokenAddress:(arg0: string)=>void;
  setdecimals:(arg0: any)=>void;
  setFromChainID:(arg0: any)=>void;
  setToChainID:(arg0: any)=>void;
  setToBridgeAddress:(arg0: any)=>void;
  setInputAmount:(arg0: number)=>void;
  setRecipientAddress:(arg0: string)=>void;
}
export function useProvideDepositData() {
  const [fromChain, setFromChain] = useState('dfinity')
  const [toChain, setToChain] = useState('binance')
  const [fromChainList, setFromChainList] = useState<any>([])
  const [toChainList, setToChainList] = useState<any>([])
  const [tokens, setTokens] = useState<any>([])
  const [symbol, setSymbol] = useState<string>('ICP')
  const [bridgeAddress, setBridgeAddress] = useState<string>('bridgeAddress')
  const [tokenAddress, setTokenAddress] = useState<string>('tokenAddress')
  const [toBridgeAddress, setToBridgeAddress] = useState<string>('tokenAddress')
  const [decimals, setdecimals] = useState<number>()
  const [fromChainID, setFromChainID] = useState<number>(0)
  const [toChainID, setToChainID] = useState<number>(0)
  const [inputAmount, setInputAmount] = useState<number>(0)
  const [recipientAddress, setRecipientAddress] = useState<string>('')

  return {
    fromChain:fromChain,
    toChain:toChain,
    fromChainList:fromChainList,
    toChainList:toChainList,
    tokens:tokens,
    symbol:symbol,
    bridgeAddress:bridgeAddress,
    tokenAddress:tokenAddress,
    decimals:decimals,
    fromChainID:fromChainID,
    toChainID:toChainID,
    toBridgeAddress:toBridgeAddress,
    inputAmount: inputAmount,
    recipientAddress:recipientAddress,
    setFromChain,
    setToChain,
    setFromChainList,
    setToChainList,
    setTokens,
    setSymbol,
    setBridgeAddress,
    setTokenAddress,
    setdecimals,
    setFromChainID,
    setToChainID,
    setToBridgeAddress,
    setInputAmount,
    setRecipientAddress,
  }
}


export const DepositDataContext = React.createContext<DepositTokenInterface>(null!);

export function ProvideDepositDataContext({ children }) {
  const depositData = useProvideDepositData();
  return <DepositDataContext.Provider value={depositData}>{children}</DepositDataContext.Provider>;
}

export const useDepositData = () => {
  return useContext(DepositDataContext);
};
import React, { useContext, useState } from "react";
import { actorFactory } from '../canisters/actorFactory'
import { ethers } from "ethers";
declare const window: any;

export interface AuthWalletContextInterface {
  isAuthWalletConnected: boolean;
  connectPanelVisible: boolean;
  walletAddress: string;
  connectWalletType:string;
  setConnectWalletType: (arg0: string) => void;
  setAuthWalletConnected: (arg0: boolean) => void;
  setConnectPanelVisible: (arg0: boolean, arg1?: () => void) => void;
  setWalletAddress: (arg0: string) => void;
  handleConnect: (arg0: string) => void;
  setAmount: (arg0: string) => void;
  setLoadings: (arg0: boolean) => void;
  loadings: boolean;
  amountLoad: boolean;
  amount: string;
}

export function useProvideAuthWallet() {
  const [isAuthWalletConnected, setAuthWalletConnected] = useState<boolean>(false)
  const [connectPanelVisible, setConnectPanelVisible] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('...')
  const [connectWalletType, setConnectWalletType] = useState<string>('dfinity')
  const [loadings, setLoadings] = useState(false)
  const [amount, setAmount] = useState<string>('')
  const [amountLoad, setAmountLoad] = useState<boolean>(false)

  const getPlugAssets = async () => {
    const requestBalance = await (window as any).ic.plug.requestBalance();
    console.log(`requestBalance`, requestBalance);
    setAmountLoad(false)
    return requestBalance[0].amount.toFixed(4);
  }

  const connectPlugWallet = async () => {
    if (typeof (window as any).ic === 'undefined') {
      window.open('https://metamask.io/download.html')
      return false
    } else {
      const whitelist = ['qoctq-giaaa-aaaaa-aaaea-cai'];
      const requestConnect = await (window as any).ic.plug.requestConnect({
        whitelist,
      });
      if (requestConnect) {
        setAmountLoad(true)
        const principal = await (window as any)?.ic?.plug?.agent?.getPrincipal();
        setAuthWalletConnected(true)
        console.log('PlugWallet', principal.toHex())
        await actorFactory.authenticateActor
        setWalletAddress(principal.toHex())
        setLoadings(false)
        setConnectWalletType('dfinity')
        setAmount(await getPlugAssets())
      } else {
        console.log(`The Connection was denied!`);
      }
    }
  }

  const getBscBalance = (provider, addr) => {
    return new Promise(async (resolve, reject) => {
      try {
        let balance = await provider.getBalance(addr);
        console.log('bscbalance',ethers.utils.formatEther(balance))
        resolve(ethers.utils.formatEther(balance));
      }
      catch (err) {
        reject(err);
      }
    });
  }


  const connectBsc = async () => {
    if (typeof window.ethereum === 'undefined') {
      window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
      return false
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setAmountLoad(true)
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setWalletAddress(accounts[0])
          setAuthWalletConnected(true)
          getBscBalance(provider, accounts[0]).then(b => {
            let str: string = Number(b).toFixed(4)
            setAmount(str)
            setAmountLoad(false)
          });
          setConnectWalletType('binance')
          setLoadings(false)
        })
        .catch((err) => {
          console.error(err);
        });
      
    }
  }

  const handleConnect = async (curNetwork) => {
    setLoadings(true)
    if (curNetwork === 'dfinity') {
      connectPlugWallet()
    } else {
      connectBsc()
    }
  }

  return {
    isAuthWalletConnected: isAuthWalletConnected,
    connectPanelVisible: connectPanelVisible,
    walletAddress: walletAddress,
    connectWalletType:connectWalletType,
    amountLoad:amountLoad,
    setConnectWalletType,
    setAuthWalletConnected,
    setConnectPanelVisible,
    setWalletAddress,
    handleConnect,
    setAmount,
    setLoadings,
    loadings: loadings,
    amount: amount
  }
}

export const ConnectContext = React.createContext<AuthWalletContextInterface>(null!);

export function ProvideConnectContext({ children }) {
  const authWallet = useProvideAuthWallet();
  return <ConnectContext.Provider value={authWallet}>{children}</ConnectContext.Provider>;
}

export const useAuthWallet = () => {
  return useContext(ConnectContext);
};
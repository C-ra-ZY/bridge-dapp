import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
declare const window: any;

export interface AuthWalletContextInterface {
  isAuthWalletConnected: boolean;
  connectPanelVisible: boolean;
  walletAddress: string;
  connectWalletType: string;
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

  useEffect(() => {
    getCurrentAccountOfBsc().then((res: any) => {
      if (res.connected) {
        console.log(`BSC connection is ${res.connected}`);
        setAmountLoad(true)
        setAuthWalletConnected(true);
        setConnectWalletType('binance')
        setWalletAddress(res.account)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        getBscBalance(provider, res.account).then(b => {
          let str: string = Number(b).toFixed(4)
          setAmount(str)
          setAmountLoad(false)
        });
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    (async () => {
      const whitelist = ['qoctq-giaaa-aaaaa-aaaea-cai'];
      const result = await window.ic.plug.isConnected({
        whitelist
      });
      console.log(`Plug connection is ${result}`);
    })()
  }, [])

  /*  useEffect(() => {
     verifyConnectionAndAgent();
   }, []);
  */
  /*  const verifyConnectionAndAgent = async () => {
     const whitelist = ['qoctq-giaaa-aaaaa-aaaea-cai'];
     const connected = await window.ic.plug.isConnected();
     if (!connected) await window.ic.plug.requestConnect({ whitelist });
     if (connected && !window.ic.plug.agent) {
       await window.ic.plug.createAgent({ whitelist })
     }
   }; */

  const getPlugAssets = async()=> {
    const response = await window.ic?.plug?.requestBalance();
    console.log(response);
    setAmountLoad(false)
    setAmount(response[0].amount.toFixed(4))
  }

  const connectPlugWallet = async () => {
    console.log('connect Plug')
    if (typeof (window as any).ic === 'undefined') {
      window.open('https://plugwallet.ooo/')
      return false
    } else {
      const whitelist = ['qoctq-giaaa-aaaaa-aaaea-cai'];
      const requestConnect = await window.ic?.plug?.requestConnect({
        whitelist
      });
      if (requestConnect) {
        setAmountLoad(true)
        const principal = await window.ic?.plug?.agent.getPrincipal();
        setAuthWalletConnected(true)
        setWalletAddress(principal.toHex())
        setLoadings(false)
        setConnectWalletType('dfinity')
        // await getPlugAssets()
        setTimeout(()=>{
          getPlugAssets()
        },100)
      } else {
        console.log(`The Connection was denied!`);
      }
    }
  }
  /* ------------------------------ bsc auth ---------------------------------------- */
  const getCurrentAccountOfBsc = () => {
    return new Promise(async (resolve, reject) => {
      if (typeof window.ethereum === 'undefined') {
        resolve({ connected: false, account: "" });
      } else if (window.ethereum) {
        window.ethereum.request({ method: 'eth_accounts' })
          .then(accounts => {
            if (accounts.length === 0) {
              resolve({ connected: false, account: "" });
            } else {
              resolve({ connected: true, account: accounts[0] });
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  const getBscBalance = (provider, addr) => {
    return new Promise(async (resolve, reject) => {
      try {
        let balance = await provider.getBalance(addr);
        console.log('bscbalance', ethers.utils.formatEther(balance))
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
          console.log(accounts);
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
    connectWalletType: connectWalletType,
    amountLoad: amountLoad,
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
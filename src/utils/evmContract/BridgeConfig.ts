import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import coinMetamsk from '../../assets/images/metamsk_30.png';

export const BridgeConfig = [
  {
    chainName: "dfinity",
    icon: coinDfinity,
    title: 'Dfinity Network',
    bridgeAddress: "deoht-3aaaa-aaaah-aapsa-cai", //deoht-3aaaa-aaaah-aapsa-cai
    chainID: 2,
    tokens:
      [
        {
          "decimals": 18,
          "symbol": 'ICP',
          "name": 'ICP',
          "icon": coinDfinity,
          "tokenAddress": 'e5cvx-dyaaa-aaaai-qatja-cai' //e5cvx-dyaaa-aaaai-qatja-cai
        }
      ]
  },
  {
    chainName: 'binance',
    icon: coinBinance,
    title: 'Binance Smart Chain',    
    bridgeAddress: "0x5F81DA37FDF2172C26096B7e07141791bA2Bbda1",//local
    // bridgeAddress: "0x45e306DDEA10fF1C2bFf232677253Bdd7162d293", 
    HandlerAddress:'0x7a22AF7F0226718f768593f8BFa54b9a23F1D636',
    chainID: 1,
    tokens:
      [
        {
          "decimals": 18,
          "symbol": 'IICP',
          "name": 'IICP',
          "icon": coinDfinity,
          "tokenAddress": '0x0440a488aE356753B5ef20bcbf3F1557E62E81c3'//local
          // "tokenAddress": '0xa80cc30bd328EE0b2b61C3aCCa8366E659f4b31e'
        }
      ]
  },
  {
    chainName: 'other',
    icon: coinMetamsk,
    title: 'Other Smart Chain',
    bridgeAddress: "0x3A07ED8Bb58a29C5817C17B08eAB5e01769huobi",
    chainID: 3,
    tokens:
      [
        {
          "decimals": 18,
          "symbol": 'SOL',
          "name": 'SOL NAME TEST',
          "icon": coinDfinity,
          "tokenAddress": '0xE551Dc711A5eC0D32f110b71B9142f5F9bfe8EA1'
        },
        {
          "decimals": 20,
          "symbol": 'TESTBTC',
          "name": 'TESTBTC Nmae',
          "icon": coinDfinity,
          "tokenAddress": '0x99998888777744445588777666'
        }
      ]
  }
]


/* 
const fromChain = [
  {
    name: 'dfinity',
    icon: coinDfinity,
    title: 'Dfinity Network',
  },
  {
    name: 'binance',
    icon: coinBinance,
    title: 'Binance Smart Chain'
  }
]

let toChain = [...fromChain.map(r => {
  return Object.assign({}, r)
})]
 */

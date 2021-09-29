import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import coinMetamsk from '../../assets/images/metamsk_30.png';

export const BridgeConfig = [
  {
    chainName: "dfinity",
    icon: coinDfinity,
    title: 'Dfinity Network',
    bridgeAddress: "rwlgt-iiaaa-aaaaa-aaaaa-cai",
    chainID: 2,
    tokens:
      [
        {
          "decimals": 18,
          "symbol": 'ICP',
          "name": 'ICP',
          "icon": coinDfinity,
          "tokenAddress": 'ryjl3-tyaaa-aaaaa-aaaba-cai' //
        }
      ]
  },
  {
    chainName: 'binance',
    icon: coinBinance,
    title: 'Binance Smart Chain',
    bridgeAddress: "0x59D46a0bbD4ECFe2E90f52C0532585a6537A37B6",
    chainID: 1,
    tokens:
      [
        {
          "decimals": 18,
          "symbol": 'IICP',
          "name": 'IICP',
          "icon": coinDfinity,
          "tokenAddress": '0x700dAEE9222d61805c20465208F1cd91f3495166'
        },
        {
          "decimals": 16,
          "symbol": 'TEST',
          "name": 'TEST Nmae',
          "icon": coinDfinity,
          "tokenAddress": '0x99998888777744445588777666'
        }
      ]
  },
  {
    chainName:'other',
    icon: coinMetamsk,
    title: 'Other Smart Chain',
    bridgeAddress:"0x3A07ED8Bb58a29C5817C17B08eAB5e01769huobi",
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


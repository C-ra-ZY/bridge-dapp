import React, { useEffect } from 'react';
import { BridgeConfig } from '../../utils/evmContract/BridgeConfig'
import styles from './ChooseDirection.module.css'
import { Col, Row, Form, Select, Image, Button, } from 'antd';
import { IconFont } from '../icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDepositData } from '../../pages/iBridge/depositData';
import { useAuthWallet } from '../../utils/authWallet/AuthWallet';
const { Option } = Select;
declare const window: any;
export const ChooseDirection: React.FC = () => {
  let { ...authWallet } = useAuthWallet();
  const { ...useData } = useDepositData();


  useEffect(() => {
    const initData = () => {
      useData.setFromChainList(BridgeConfig)
      useData.setToChainList(BridgeConfig.filter(item => item.chainName !== useData.fromChain))
      useData.setBridgeAddress(BridgeConfig.find(item => item.chainName === useData.fromChain)?.bridgeAddress)
      useData.setFromChainID(BridgeConfig.find(item => item.chainName === useData.fromChain)?.chainID)
      useData.setToChainID(BridgeConfig.find(item => item.chainName === useData.toChain)?.chainID)
      useData.setTokens(BridgeConfig.find(item => item.chainName === useData.fromChain)?.tokens)
      useData.setdecimals(BridgeConfig.find(item => item.chainName === useData.fromChain)?.tokens[0].decimals)
      useData.setSymbol(useData.tokens[0]?.symbol)
      useData.setTokenAddress(useData.tokens[0]?.tokenAddress)
    }
    initData()
  }, [useData.fromChain, useData.toChain, useData.tokens])

  const handleChangeFromChain = e => {
    useData.setFromChain(e)
    useData.setToChainList(BridgeConfig.filter(item => item.chainName !== e))
    useData.setBridgeAddress(BridgeConfig.find(item => item.chainName === e)?.bridgeAddress)
    useData.setFromChainID(BridgeConfig.find(item => item.chainName === e)?.chainID)
    useData.setToChain(BridgeConfig.filter(item => item.chainName !== e)[0].chainName)
    useData.setTokens(BridgeConfig.find(item => item.chainName === e)?.tokens)
    useData.setdecimals(BridgeConfig.find(item => item.chainName === e)?.tokens[0].decimals)
  }

  const handleChangeToChain = e => {
    useData.setToChain(e)
  }

  const handleChangeChain = () => {
    useData.setFromChain(useData.toChain)
    useData.setToChain(useData.fromChain)
  }

  const handleChangeToken = e => {
    useData.setSymbol(e)
    useData.setTokenAddress(useData.tokens?.find(item => item.symbol === e)?.tokenAddress)
  }

  useEffect(() => {
    if(authWallet.isAuthWalletConnected){
      handleChangeChain()
    }
  }, [authWallet.connectWalletType])

  const addNetWork = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x38',
            chainName: 'BSC',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com/'],
          }
        ],
      }).then((res: any) => {
        console.log('success', res)
      }).catch((e) => {
        console.log(e)
      })
    }
  }

  return (
    <>
      <Row gutter={24}>
        <Col span={11}>
          <Form.Item label="From">
            <Select
              value={useData.fromChain}
              onChange={e => {
                handleChangeFromChain(e)
              }}
            >
              {
                useData.fromChainList.map((item, index) => (
                  <Option className={styles['seloption']} value={item.chainName} key={index}>
                    <Image src={item.icon} className={styles['select-icon']} preview={false} />{item.title}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
        </Col>

        <Col span={2}>
          <Form.Item label={" "}>
            <div style={{ textAlign: 'center', color: '#fff' }}><IconFont type="icon-jiaohuan" onClick={() => {
              handleChangeChain()
            }} /></div>
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item label="To">
            <Select
              value={useData.toChain}
              onChange={e => {
                handleChangeToChain(e)
              }}
            >
              {
                useData.toChainList.map((item, index) => (
                  <Option className={styles['seloption']} value={item.chainName} key={index}>
                    <Image src={item.icon} className={styles['select-icon']} preview={false} />{item.title}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ margin: "-20px 0 10px", color: '#B5B4C3', lineHeight: '28px' }}>
        If you have not add Binance Smart Chain network in your MetaMask yet,<br />
        please click <Button size="small" className={styles['btnAddNetwrol']} onClick={() => {
          addNetWork();
        }}>Add network</Button> and continue
      </Form.Item>

      <Form.Item label="Asset"
        extra={
          <div className={styles['form-extra-text']}>
            Add IICP to MetaMask<Button className={styles['addbtn']} onClick={() => { console.log('Add') }}>
              <PlusCircleOutlined /></Button>
          </div>
        }>
        <Select
          value={useData.symbol}
          placeholder="Binance Smart Chain…"
          onChange={(e) => { handleChangeToken(e) }}
        >
          {
            useData.tokens.map((item, index) => (
              <Option className={styles['seloption']} value={item.symbol} key={index}>
                <Image src={item.icon} className={styles['select-icon']} preview={false} />{item.symbol}
              </Option>
            ))
          }
        </Select>
      </Form.Item>
    </>
  )
}
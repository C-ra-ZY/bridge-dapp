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
  const { ...useDatas } = useDepositData();


  useEffect(() => {
    const initData = () => {
      useDatas.setFromChainList(BridgeConfig)
      useDatas.setToChainList(BridgeConfig.filter(item => item.chainName !== useDatas.fromChain))
      useDatas.setBridgeAddress(BridgeConfig.find(item => item.chainName === useDatas.fromChain)?.bridgeAddress)
      useDatas.setFromChainID(BridgeConfig.find(item => item.chainName === useDatas.fromChain)?.chainID)
      useDatas.setToChainID(BridgeConfig.find(item => item.chainName === useDatas.toChain)?.chainID)
      useDatas.setTokens(BridgeConfig.find(item => item.chainName === useDatas.fromChain)?.tokens)
      useDatas.setdecimals(BridgeConfig.find(item => item.chainName === useDatas.fromChain)?.tokens[0].decimals)
      useDatas.setSymbol(useDatas.tokens[0]?.symbol)
      useDatas.setTokenAddress(useDatas.tokens[0]?.tokenAddress)
    }
    initData()
  }, [useDatas.fromChain, useDatas.toChain, useDatas.tokens])

  const handleChangeFromChain = e => {
    useDatas.setFromChain(e)
    useDatas.setToChainList(BridgeConfig.filter(item => item.chainName !== e))
    useDatas.setBridgeAddress(BridgeConfig.find(item => item.chainName === e)?.bridgeAddress)
    useDatas.setFromChainID(BridgeConfig.find(item => item.chainName === e)?.chainID)
    useDatas.setToChain(BridgeConfig.filter(item => item.chainName !== e)[0].chainName)
    useDatas.setTokens(BridgeConfig.find(item => item.chainName === e)?.tokens)
    useDatas.setdecimals(BridgeConfig.find(item => item.chainName === e)?.tokens[0].decimals)
  }

  const handleChangeToChain = e => {
    useDatas.setToChain(e)
  }

  const handleChangeChain = () => {
    useDatas.setFromChain(useDatas.toChain)
    useDatas.setToChain(useDatas.fromChain)
  }

  const handleChangeToken = e => {
    useDatas.setSymbol(e)
    useDatas.setTokenAddress(useDatas.tokens?.find(item => item.symbol === e)?.tokenAddress)
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
              value={useDatas.fromChain}
              onChange={e => {
                handleChangeFromChain(e)
              }}
            >
              {
                useDatas.fromChainList.map((item, index) => (
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
              value={useDatas.toChain}
              onChange={e => {
                handleChangeToChain(e)
              }}
            >
              {
                useDatas.toChainList.map((item, index) => (
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
        }}>Add network</Button> and continue.
        
      </Form.Item>

      <Form.Item label="Asset"
        extra={
          <div className={styles['form-extra-text']}>
            Add IICP to MetaMask<Button className={styles['addbtn']} onClick={() => { console.log('Add') }}>
              <PlusCircleOutlined /></Button>
          </div>
        }>
        <Select
          value={useDatas.symbol}
          placeholder="Binance Smart Chain…"
          onChange={(e) => { handleChangeToken(e) }}
        >
          {
            useDatas.tokens.map((item, index) => (
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
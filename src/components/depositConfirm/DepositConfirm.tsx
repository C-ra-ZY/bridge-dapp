import React, { useEffect, useState } from 'react';
import styles from './DepositConfirm.module.css'
import { Button, Col, Modal, Row } from 'antd';
import { useAuthWallet } from '../../utils/authWallet/AuthWallet';
import { ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';
import { Deposit, depositDataInterface } from "../../utils/evmContract/Deposit";
import { useDepositData } from '../../pages/iBridge/depositData';

interface propsType {
  visible: boolean;
  fee: string;
  receive: string;
  resetApprovalState: () => void;
  hide?: () => void;
}

export const DepositConfirm: React.FC<propsType> = ({ visible, fee, receive, resetApprovalState, hide }) => {
  const [depositLoading, setDepositLoading] = useState(false)
  const [depositResult, setDepositResult] = useState(true)
  const [depositResultSuccess, setDepositResultSuccess] = useState(false)
  const { ...authWallet } = useAuthWallet();
  const { ...mydepositTool } = Deposit();
  const { bridgeAddress, tokenAddress, inputAmount, fromChainID, toChainID, decimals, recipientAddress } = useDepositData();

  useEffect(() => {
    console.table({
      'bridgeAddress': bridgeAddress,
      'tokenAddress': tokenAddress,
      'recipientAddress': recipientAddress,
      'decimals': decimals,
      'fromChainID': fromChainID,
      'toChainID': toChainID,
      'inputAmount': inputAmount
    })
  }, [depositLoading])

  const handleShare = () => {
    if (authWallet.connectWalletType === 'dfinity') {
      window.open(`https://ic.rocks/account/${authWallet.walletAddress}`)
    } else {
      window.open(`https://bscscan.com/address/${authWallet.walletAddress}`);
    }
  }

  const createDeposit = async () => {
    setDepositLoading(true)
    let depositData: depositDataInterface = {
      bridgeAddress: bridgeAddress,
      fromChainID: fromChainID,
      toChainID: toChainID,
      tokenAddress: tokenAddress,
      inputAmount: inputAmount,
      recipientAddress: recipientAddress,
      decimals: decimals,
      walletAddress: authWallet.walletAddress,
    }
    if (authWallet.connectWalletType === 'dfinity') {
      mydepositTool.depositOfDfinity(depositData).then(res => {
        console.log('res of Dfinity', res)
        if (res) {
          setDepositResult(false);
          setDepositResultSuccess(true);
        } else {
          setDepositResult(false);
          setDepositResultSuccess(false);
        }
      }).catch(err => {
        console.log("catch depositOfDfinity", err)
        setDepositResult(false);
        setDepositResultSuccess(false);
      })

    } else {
      mydepositTool.depositOfBsc(depositData).then(res => {
        console.log('res of BSC', res)
        if (res) {
          setDepositResult(false);
          setDepositResultSuccess(true);
        }else{
          setDepositResult(false);
          setDepositResultSuccess(false);
        }
        resetApprovalState()
      }).catch(err => {
        console.log('catch depositOfBsc',err)
        setDepositResult(false);
        setDepositResultSuccess(false);
      })
    }
  }

  return (
    <Modal width={420} className="modalcon" visible={visible} footer={false}
      onCancel={() => {
        hide?.();
        setDepositLoading(false)
      }}
    >
      {
        !depositLoading
          ?
          <>
            <h3 className={styles.modaltitle}>Deposite IICP for ICP</h3>
            <Row>
              <Col><h4 className={styles.title}>Confirm</h4></Col>
            </Row>
            <Row className={styles.row} justify="space-between">
              <Col><span className={styles.desc}>Deposite amount</span></Col>
              <Col><span className={styles.number}>{inputAmount} IICP</span></Col>
            </Row>
            <Row className={styles.row} justify="space-between">
              <Col><span className={styles.desc}>Fee</span></Col>
              <Col><span className={styles.number}>{fee} ICP</span></Col>
            </Row>
            <Row className={styles.row} justify="space-between">
              <Col><span className={styles.desc}>Receive</span></Col>
              <Col><span className={styles.number}>{receive} IICP</span></Col>
            </Row>
            <div className={styles['btn-wrap']}>
              <Button size="large" block className={styles.btn}
                onClick={() => {
                  createDeposit()
                }}>Confirm Deposite</Button>
            </div>
          </>
          :
          depositResult ?
            <div className={styles.loadingwrap}>
              <div className={styles.loading}></div>
              <h3 className={styles.modaltitle}>Waiting For Confirmation</h3>
              <h3 className={styles.modaltitle}>Deposit {inputAmount} IICP for {receive} ICP</h3>
              <p className={styles.loadingdesc}>Confirm this transaction in your wallet</p>
            </div> :
            depositResultSuccess ?
              <div className={styles.result}>
                <div className={styles.doneIcon}><ArrowUpOutlined /></div>
                <h3 className={styles.modaltitle}>Transaction Submitted</h3>
                <h3 className={styles.donedesc} onClick={() => { handleShare() }}>View on Binance Smart Chain Explore</h3>
              </div>
              :
              <div className={styles.result}>
                <div className={styles.errorIcon}><CloseOutlined /></div>
                <h3 className={styles.errortitle}>Transaction reject</h3>
                <div className={styles['btn-wrap']}>
                  <Button size="large" block className={styles.btn}
                    onClick={() => {
                      hide?.();
                      setDepositLoading(false);
                      resetApprovalState()
                    }}>Dismiss</Button>
                </div>
              </div>
      }
    </Modal>
  )
}
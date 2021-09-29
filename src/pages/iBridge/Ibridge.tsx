import React, { useState, useEffect } from 'react'
import styles from './Ibridge.module.css';
import { SideMenu, Description, DepositConfirm, ChooseDirection } from '../../components'
import { Col, Row, Form, Button, Alert, Input, message } from 'antd';
import { useAuthWallet } from '../../utils/authWallet/AuthWallet';
import { Deposit } from "../../utils/evmContract/Deposit";
import { useDepositData } from './depositData';

export const Ibridge: React.FC = () => {
  const { ...authWallet } = useAuthWallet();
  const { ...mydepositTool } = Deposit();
  const { calculateFee } = Deposit();
  const [fee, setFee] = useState<string>('--')
  const [receive, setReceive] = useState<string>('--')

  const { tokenAddress, inputAmount, decimals, bridgeAddress, recipientAddress, setRecipientAddress, setInputAmount } = useDepositData();

  const [approvalState, setApprovalState] = useState<boolean>(false)
  const [approvalLoading, setApprovalLoading] = useState<boolean>(false)
  const [depositConfirmVisible, setDepositConfirmVisible] = useState<boolean>(false)

  const [depositError, setDepositError] = useState<boolean>(false)

  const [dfinityBtn, setDfinityBtn] = useState({
    text: 'Connect Dfinity Wallet',
    className: 'btn-cdw'
  })

  const handleDfinityBtnClick = async () => {
    if (!authWallet.isAuthWalletConnected) {
      authWallet.setConnectPanelVisible(true)
    } else {
      if (recipientAddress === '') {
        alert('The Destination Address is empty')
      } else {
        setDepositConfirmVisible(true)
      }
    }
  }

  const handleApproval = () => {
    if (!approvalState) {
      setApprovalLoading(true)
      mydepositTool.erc20Approval(bridgeAddress, tokenAddress, inputAmount, decimals).then(async (approveRes: any) => {
        console.log(approveRes)
        try {
          if (approveRes.hash) {

            setApprovalState(true)
            setApprovalLoading(false)
            // await authWallet.getPlugAssets()
          }
        } catch (error) {
          console.log(error)
        }
      }).catch(err => {
        console.log(err)
        setApprovalLoading(false)
        message.error(err.message)
      })
    }
  }

  const handleBscBtnClick = async () => {
    if (!approvalState) {
      return false
    } else {
      if (recipientAddress === '') {
        alert('The Destination Address is empty')
      } else {
        setDepositConfirmVisible(true)
      }
    }
  }

  useEffect(() => {
    if (!authWallet.isAuthWalletConnected) {
      setDfinityBtn({
        text: 'Connect Dfinity Wallet',
        className: 'btn-cdw'
      })
    } else {
      setDfinityBtn({
        text: 'Deposit ICP for IICP',
        className: 'btn-icptoiicp'
      })
    }
  }, [authWallet.isAuthWalletConnected])

  const handleAmount = (e) => {
    let useInputAmount = e;
    if (typeof e == 'object') {
      useInputAmount = e.target.value
      setInputAmount(useInputAmount);
    } else {
      if (e) setInputAmount(parseFloat(e))
    }
    let getfee = calculateFee(useInputAmount) || 0;
    let receive = useInputAmount - getfee || 0;
    setFee(getfee.toString());
    setReceive(receive.toString());
  }

  return (
    <div className="continer">
      <Row className="main">
        <Col span={5}>
          <SideMenu />
        </Col>
        <Col span={19}>
          <Row className="content-wrap">
            <Col span={6}>
              <Description />
            </Col>
            <Col span={18}>

              <div className={styles['content-main']}>
                <Form className={`${styles['main-form']} main-form-them`} layout="vertical">
                  <ChooseDirection />

                  <Form.Item label="Amount" extra={
                    <div className={styles['form-extra-text']}>The minimum amount is 1.0000 ICP
                      <span style={{ float: 'right' }}>
                        Fee: {fee} ICP | Receive: {receive} IICP
                      </span></div>
                  }>
                    <Input placeholder="1.0000" type='number' value={inputAmount} onChange={e => {
                      handleAmount(e)
                    }} suffix={
                      <Button size="small" className={styles.btnmax}
                        onClick={() => { handleAmount(`${authWallet.amount}`) }}
                      >
                        Max
                      </Button>
                    } />
                  </Form.Item>

                  <Form.Item label="Destination Address" name="DestinationAddress" extra={
                    <div className={styles['form-extra-text']}>
                      This is the destination address of the To network
                    </div>
                  }>
                    <Input placeholder="Enter your destination address" onChange={(e) => {
                      setRecipientAddress(e.target.value)
                    }} />
                  </Form.Item>

                  {
                    authWallet.connectWalletType === 'dfinity'
                      ?
                      <Form.Item>
                        {
                          !depositError ?
                            <Button block type="primary" size="large"
                              className={styles[dfinityBtn.className]}
                              onClick={() => {
                                handleDfinityBtnClick()
                              }}>
                              {dfinityBtn.text}
                            </Button>
                            :
                            <Alert
                              message="Wrong network! Please change “from” to Dfinity Mainnet to continue."
                              type="error" className={styles['text-error']} />
                        }

                      </Form.Item>
                      :
                      <Row gutter={24}>
                        <Col span={11}>
                          <Form.Item>
                            <Button block type="primary" size="large"
                              loading={approvalLoading}
                              className={
                                approvalState ? styles['btn-gray'] : styles['btn-approving']
                              }
                              onClick={() => {
                                handleApproval()
                              }}
                            >
                              Approving
                            </Button>
                          </Form.Item>
                        </Col>

                        <Col span={2}></Col>

                        <Col span={11}>
                          <Form.Item>
                            <Button block type="primary" size="large"
                              className={
                                approvalState ? styles['btn-icptoiicp'] : styles['btn-gray']
                              }
                              onClick={() => {
                                handleBscBtnClick()
                              }}>
                              Deposit IICP for ICP
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                  }

                  <Form.Item style={{ margin: "-10px 0 10px", color: '#B5B4C3' }}>
                    After you deposit in Dfinity.Ibridge system will send IICP to your destination address as soon as possible.
                  </Form.Item>
                </Form>
              </div>

              <DepositConfirm
                fee={fee}
                receive={receive}
                visible={depositConfirmVisible}
                resetApprovalState={() => setApprovalState(false)}
                hide={() => setDepositConfirmVisible(false)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
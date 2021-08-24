import React, { useState} from 'react'
import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import styles from './Ibridge.module.css';
import { Header, SideMenu, Footer, Description, IconFont } from '../../components'
import { Col, Row, Form, Button, Select, Input, Image, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';


const { Option } = Select;
const woptionArray = [
  {
    val: 'dfinity',
    icon: coinDfinity,
    title: 'Dfinity Network'
  },
  {
    val: 'binance',
    icon: coinBinance,
    title: 'Binance Smart Chain'
  }
]
export const Ibridge: React.FC = () => {
  const [loadings, setLoadings] = useState(false)
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  
  return (
    <>
        <Header/>
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
                      <Row gutter={24}>
                        <Col span={11}>
                          <Form.Item label="From">
                            <Select
                              defaultValue={'dfinity'}
                              placeholder={
                                <React.Fragment>
                                  <Image src={coinDfinity} className={styles['select-icon']} />&nbsp; Dfinity Network
                                </React.Fragment>
                              }
                              onChange={handleChange}
                            >
                              {
                                woptionArray.map((item, index) => (
                                  <Option className={styles.seloption} value={item.val} key={index}>
                                    <Image src={item.icon} className={styles['select-icon']} preview={false} />{item.title}
                                  </Option>
                                ))
                              }
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <Form.Item label=" ">
                            <div style={{ textAlign: 'center', color: '#fff' }}><IconFont type="icon-jiaohuan" onClick={() => {
                              console.log('change')
                            }} /></div>
                          </Form.Item>
                        </Col>
                        <Col span={11}>
                          <Form.Item label="To">
                            <Select
                              defaultValue={'binance'}
                              placeholder={
                                <React.Fragment>
                                  <Image src={coinBinance} className={styles['select-icon']} />&nbsp; Binance Smart Chain…
                                </React.Fragment>
                              }
                            >
                              {
                                woptionArray.map((item, index) => (
                                  <Option className={styles.seloption} value={item.val} key={index}>
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
                        please click <Button size="small" className={styles.btnAddNetwrol}>Add network</Button> and continue
                      </Form.Item>

                      <Form.Item label="Asset">
                        <Select
                          placeholder="Binance Smart Chain…"
                        >
                          <Option value="icp" className={styles.seloption}><Image src={coinDfinity} className={styles['select-icon']} preview={false} /> ICP</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item style={{ margin: "-20px 0 10px", color: '#B5B4C3' }}>
                        Add IICP to MetaMask<Button className={styles.addbtn} onClick={() => { console.log('Add') }}><PlusCircleOutlined /></Button>
                      </Form.Item>

                      <Form.Item label="Amount" extra={
                        <>The minimum amount is 1.0000 ICP
                          <span style={{ float: 'right' }}>
                            Fee:- - ICP | Receive:- - IICP
                          </span></>
                      }>
                        <Input placeholder="1.0000" suffix={<Button size="small" className={styles.btnmax} onClick={() => { console.log('max') }}>Max</Button>} />
                      </Form.Item>

                      <Form.Item label="Destination Address" extra="This is the destination address of the To network">
                        <Input placeholder="Enter your destination address" />
                      </Form.Item>

                      <Form.Item>
                        <Button block type="primary" htmlType="submit" size="large" className={styles['btn-cdw']} onClick={() => {
                          Modal.info({
                            closable: true,
                            okText: "Confirm Deposite",
                            content: 'Transaction reject'
                          })
                        }}>
                          Connect Dfinity Wallet
                        </Button>

                      </Form.Item>

                      <Form.Item>
                        <Button block type="primary" size="large" loading={loadings}
                          onClick={() => {
                            setLoadings(true)
                            Modal.error({
                              closable: true,
                              content: (
                                <Form>
                                  <Form.Item>
                                    {/* {getFieldDecorator("test", {
                                    rules: [{ required: true, message: "请填写备注信息" }]
                                  })()} */}
                                    <Input.TextArea placeholder="error" rows={4} />
                                  </Form.Item>
                                </Form>
                              ),
                              afterClose: () => {
                                setLoadings(false)
                              }
                            })
                          }}
                          className={styles['btn-icptoiicp']}>
                          Deposit ICP for IICP
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button block type="text" size="large" className={styles['btn-error']}>
                          Wrong network! Please change “from” to Dfintiy Mainnet to continue.
                        </Button>
                      </Form.Item>

                      <Row gutter={24}>
                        <Col span={11}>
                          <Form.Item>
                            <Button block type="primary" size="large" className={styles['btn-gray']} >
                              Approving
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item>
                            <Button block type="primary" size="large" className={styles['btn-gray']}>
                              Deposit IICP for ICP
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={11}>
                          <Form.Item>
                            <Button block type="primary" size="large" className={styles['btn-approving']} >
                              Approving
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item>
                            <Button block type="primary" size="large" className={styles['btn-icptoiicp']}>
                              Deposit IICP for ICP
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item style={{ margin: "-10px 0 10px", color: '#B5B4C3' }}>
                        After you deposit in Dfinity.Ibridge system will send IICP to your destination address as soon as possible.
                      </Form.Item>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Footer />
    </>
  )
}

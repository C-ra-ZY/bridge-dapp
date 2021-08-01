import React from 'react'
import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import styles from './Ibridge.module.css';
import { Header, SideMenu, Footer } from '../../components'
import { Col, Row, Typography, Form, Button, Select, Input, Image } from 'antd';
const { Title, Text } = Typography;
const { Option } = Select;

export const Ibridge: React.FC = () => {
  return (
    <>
      <Header />
      <div className="continer">
        <Row className="main">
          <Col span={5}>
            <SideMenu />
          </Col>
          <Col span={19}>
            <Row className="content-wrap">
              <Col span={6}>
                <Title level={4} className={styles['introduce-title']}>iBridge Introduce</Title>
                <Text className={styles.desc}>The safe, fast and most secure way to bring ICP to Binance Smart Chain and other Networks.Also,You can bring the ICP base on other chains to Dfinity network.</Text>
                <Button type="link" className={styles.btnlink} block>View Proof of Assets</Button>
                <Button type="link" className={styles.btnlink} block>Protocol Fee</Button>
                <Button type="link" className={styles.btnlink} block>User Guide</Button>
                <Button type="link" className={styles.btnlink} block>Recent Transactions</Button>
              </Col>
              <Col span={18}>
                <div className={styles['content-main']}>

                  <Form className={styles['main-form']} layout="vertical">
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="From">
                          <Select
                            placeholder={
                              <React.Fragment>
                                <Image src={coinDfinity} className={styles['select-icon']} />&nbsp; Dfinity Network
                              </React.Fragment>
                            }
                          >
                            <Option value="dfinity"><Image src={coinDfinity} className={styles['select-icon']} />Dfinity Network</Option>
                            <Option value="female"><Image src={coinBinance} className={styles['select-icon']} />Binance Smart Chain…</Option>
                            <Option value="other"><Image src={coinDfinity} className={styles['select-icon']} />other</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item label="To">
                          <Select
                            placeholder={
                              <React.Fragment>
                                <Image src={coinBinance} className={styles['select-icon']} />&nbsp; Binance Smart Chain…
                              </React.Fragment>
                            }
                          >
                            <Option value="dfinity"><Image src={coinDfinity} className={styles['select-icon']} />Dfinity Network</Option>
                            <Option value="female"><Image src={coinDfinity} className={styles['select-icon']} />female</Option>
                            <Option value="other"><Image src={coinDfinity} className={styles['select-icon']} />other</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <p style={{ color: "#B5B4C3" }}>
                      If you have not add Binance Smart Chain network in your MetaMask yet,<br />
                      please click <Button size="small">Add network</Button> and continue</p>
                    <Form.Item label="Asset" extra="Add IICP to MetaMask">
                      <Select
                        placeholder="Binance Smart Chain…"
                        allowClear
                      >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Amount" extra="The minimum amount is 1.0000 ICP">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Destination Address" extra="This is the destination address of the To network">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                      <Button block type="primary" htmlType="submit">
                        Submit
                      </Button>
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

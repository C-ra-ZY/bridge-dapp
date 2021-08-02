
import styles from './HeaderWallet.module.css'
import React, { useState } from 'react'
import { Button, Popconfirm, Typography, Skeleton,Row, Col } from 'antd'
import { DownOutlined } from '@ant-design/icons';
export const HeaderWallet: React.FC = () => {
	const [data, setdata] = useState(0)
	const [showmask, setshowmask] = useState(false)

	const content = () => {

		return <div style={{ width: "400px" }} className="connectWalletWrap">
			{data ? <>
				<Row gutter={24}>
					<Col span={20}><Typography.Title level={4} className={styles.formtitle}>Connect wallet</Typography.Title></Col>
					<Col span={4} style={{textAlign:'right'}}><Button size='small'>X</Button></Col>
				</Row>
				<Row gutter={24}>
				<Col span={18}><Typography.Text className={styles.formtext}>Connect with MetaMask</Typography.Text></Col>
				<Col span={6} style={{textAlign:'right'}}><Button size='small'>Change</Button></Col>
				</Row>
				<Row>
					<Col>
					<i className={styles.coinImg}></i>
					<span className={styles.walletAddress}>0xAAE67…dbAC</span>
					</Col>
				</Row>
				

			</>
				: <Skeleton active />}
		</div >

	}
	return (
		<div className={styles['account-wallet-wrap']}>
			<Popconfirm
				icon={null}
				placement="bottomRight"
				title={content}
				color="#17172F"
				onVisibleChange={() => {
					setshowmask(!showmask)
				}}
			>
				<Button className={styles['btn-account-wallet']} onClick={() => { setdata(1)}}>
					<i className={styles.coinImg}></i>
					<span className={styles.walletAddress}>0xAAE67…dbAC</span>
					<i><DownOutlined /></i>
					</Button>
				


				<div className={showmask ? `${styles.mask}` : ''}></div>
			</Popconfirm>
		</div>
	)
}

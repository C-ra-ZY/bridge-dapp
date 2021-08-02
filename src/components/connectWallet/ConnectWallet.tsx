import React, { useState } from 'react'
import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import metamsk from '../../assets/images/metamsk_30.png';
import styles from './ConnectWallet.module.css'
import { Button, Popconfirm, Skeleton, Form, Typography, Radio, Select, Image } from 'antd';

const { Option } = Select;


export const ConnectWallet: React.FC = () => {
	const [data, setdata] = useState(0)
	const [showmask, setshowmask] = useState(false)

	const content = () => {

		return <div style={{ width: "440px" }} className="connectWalletWrap">
			{data ? <>

				<Form layout="vertical" style={{ zIndex: 9999, position: 'relative' }} initialValues={{ 'network': 'dfinity' }}>
					<Typography.Title level={4} className={styles.formtitle}>Connect wallet</Typography.Title>
					<Typography.Text className={styles.formtext}>Please choose a wallet that your destination address blongs to.</Typography.Text>
					<Form.Item
						label="Choose network"
						name="network"
						className={styles.formitem}
					>
						<Radio.Group className={styles.radios}>
							<Radio.Button value="dfinity"><Image src={coinDfinity} className={styles['select-icon']} preview={false} />Dfinity</Radio.Button>
							<Radio.Button value="binance"><Image src={coinBinance} className={styles['select-icon']} preview={false} />Binance Smart Chain</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Choose wallet" className={styles.formitem}>
						<Select
							placeholder={
								<React.Fragment>
									<Image src={coinDfinity} className={styles['select-icon']} />&nbsp; Dfinity Network
								</React.Fragment>
							}
						>
							<Option value="metaMask"><Image src={metamsk} className={styles['select-icon']} preview={false} />MetaMask</Option>
							<Option value="dfinity"><Image src={coinDfinity} className={styles['select-icon']} preview={false} />Dfinity Wallet</Option>
						</Select>
					</Form.Item>
				</Form>

			</>
				: <Skeleton active />}
		</div >

	}

	return (
		<Popconfirm
			icon={null}
			placement="bottomRight"
			title={content}
			color="#17172F"
			onVisibleChange={() => {
				setshowmask(!showmask)
			}}

		>
			<Button className={styles['btn-connect-wallet']} onClick={() => {
				setTimeout(function () {
					setdata(1)
				}, 500)
			}}>Connect Wallet</Button>
			<div className={showmask ? `${styles.mask}` : ''}></div>

		</Popconfirm>
	)
}



import React, { useState } from 'react';
import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import metamsk from '../../assets/images/metamsk_30.png';
import styles from './ConnectWallet.module.css'
import { Button, Popconfirm, Form, Typography, Image, Row, Col } from 'antd';
import { IconFont } from '../icons';
import { useAuthWallet } from '../../utils/authWallet/AuthWallet';


export const ConnectWallet: React.FC = () => {
	let {...authWallet} = useAuthWallet();
	const [curNetwork, setCurNetwork] = useState('dfinity')

	const content = () => {
		return <div style={{ width: "400px" }} className="connectWalletWrap">
				<Form layout="vertical">
					<Row gutter={24}>
						<Col span={20}><Typography.Title level={3} className={styles.formtitle}>Connect wallet</Typography.Title></Col>
						<Col span={4} style={{ textAlign: 'right' }}>
							<Button size='small' className={styles['btn-close']} onClick={() => {
								authWallet.setConnectPanelVisible(!authWallet.connectPanelVisible)
							}}>
								<IconFont type="icon-baseline-close-px" />
							</Button>
						</Col>
					</Row>
					<Typography.Text className={styles.formtext}>Please choose a wallet that your destination address blongs to.</Typography.Text>
					<span className={styles.ctitle}><Typography.Title className={styles.formtitle} level={5}>Choose network</Typography.Title></span>
					<Row justify="space-between">
						<Col>
							<Button type='ghost' className={curNetwork === 'dfinity' ? `${styles['btn-network']} ${styles['active']}` : `${styles['btn-network']}`} style={{ width: 133 }} onClick={() => { setCurNetwork('dfinity');authWallet.setLoadings(false) }} >
								<Image src={coinDfinity} className={styles['select-icon']} preview={false} />Dfinity
							</Button>
						</Col>
						<Col>
							<Button type='ghost' className={curNetwork === 'binance' ? `${styles['btn-network']} ${styles['active']}` : `${styles['btn-network']}`} onClick={() => { setCurNetwork('binance');authWallet.setLoadings(false) }}>
								<Image src={coinBinance} preview={false} />Binance Smart Chain</Button>
						</Col>
					</Row>
					<span className={styles.ctitle}><Typography.Title className={styles.formtitle} level={5}>Choose wallet</Typography.Title></span>
					{
						curNetwork === 'dfinity'
							?
							<Button block className={styles['btn-connect-wallet']}
								loading={authWallet.loadings}
								onClick={() => { authWallet.handleConnect('dfinity');setCurNetwork('dfinity') }}><Image src={coinDfinity} preview={false} />Dfinity Wallet</Button>
							: <Button block className={styles['btn-connect-wallet']}
								onClick={() => { authWallet.handleConnect('binance');setCurNetwork('binance') }}><Image src={metamsk} preview={false} />MetaMask</Button>
					}
				</Form>
		</div >
	}
	return (
		<Popconfirm
			icon={null}
			placement="bottomRight"
			title={content}
			color="#17172F"
			visible={authWallet.connectPanelVisible}
			onVisibleChange={() => {
				authWallet.setConnectPanelVisible(!authWallet.connectPanelVisible)
			}}
		>
			<Button className={styles['btn-connect-wallet']}>Connect Wallet</Button>
			<div className={authWallet.connectPanelVisible ? `${styles.mask}` : ''}></div>
		</Popconfirm>
	)
}
import styles from './HeaderWallet.module.css'
import React, { useState } from 'react'
import { Button, Popconfirm, Typography, Row, Col, message } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import Copy from 'copy-to-clipboard';
import { IconFont } from '../icons';
import { useAuthWallet } from '../../utils/authWallet/AuthWallet';
const formtaddress = (walletAddress) => {
	if (walletAddress) {
		return (
			walletAddress.slice(0, 5) + "..." + walletAddress.slice(-5)
		)
	} else {
		return 'Connect wallet'
	}

}
export const HeaderWallet: React.FC = () => {

	let { ...authWallet } = useAuthWallet();
	const [isShow, setIsShow] = useState(false)

	const handleShare = () => {
		if (authWallet.connectWalletType === 'dfinityWallet') {
			window.open(`https://ic.rocks/account/${authWallet.walletAddress}`)
		} else {
			window.open(`https://bscscan.com/address/${authWallet.walletAddress}`);
		}
	}

	const changeConnect = () => {
		window.localStorage.clear();
		setIsShow(false)
		authWallet.setAmount('')
		authWallet.setAuthWalletConnected(false)
		authWallet.setConnectPanelVisible(true)
	}

	function CoinIcon() {
		if (authWallet.connectWalletType === 'dfinity') {
			return <i className={styles.coinImgicp}></i>
		} else {
			return <i className={styles.coinImg}></i>
		}
	}

	const content = () => {
		return <div style={{ width: "400px" }} className="connectWalletWrap">

			<Row gutter={24}>
				<Col span={20}><Typography.Title level={4} className={styles.formtitle}>Connect wallet</Typography.Title></Col>
				<Col span={4} style={{ textAlign: 'right' }}>
					<Button size='small' className={styles['btn-close']} onClick={() => {
						setIsShow(!isShow)
					}}>
						<IconFont type="icon-baseline-close-px" />
					</Button>
				</Col>
			</Row>
			<Row gutter={24} style={{ paddingTop: '20px', paddingBottom: '15px', }}>
				<Col span={18}><Typography.Text className={styles.formtext}>Connect with MetaMask</Typography.Text></Col>
				<Col span={6} style={{ textAlign: 'right' }}>
					<Button size='small' title="change wallet" className={styles['btn-change']} onClick={() => {
						changeConnect()
					}}>Change</Button>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={24}>
					<CoinIcon />
					<span className={styles.walletAddress}>{formtaddress(authWallet.walletAddress)}</span>
					<Button size='small' title="rocks" className={styles.btnoption} onClick={() => {
						handleShare()
					}}><IconFont type="icon-upload" /></Button>
					<Button size='small' title="copy" className={styles.btnoption} onClick={() => {
						Copy(authWallet.walletAddress)
						message.success("Copied to the clipboard");
					}}><IconFont type="icon-copy" /></Button>
				</Col>
			</Row>
		</div >
	}

	return (
		<div className={styles['account-wallet-wrap']}>
			<Popconfirm
				icon={null}
				placement="bottomRight"
				title={content}
				color="#17172F"
				visible={isShow}
				onVisibleChange={() => {
					setIsShow(!isShow)
				}}
			>
				<Button className={styles['btn-account-wallet']}>
					<CoinIcon />
					<span className={styles.walletAddress}>{formtaddress(authWallet.walletAddress)}</span>
					<i><DownOutlined /></i>
				</Button>
				<div className={isShow ? `${styles.mask}` : ''}></div>
			</Popconfirm>
		</div>
	)
}

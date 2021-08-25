import styles from './HeaderWallet.module.css'
import React, { useState, useEffect, useContext } from 'react'
import { Button, Popconfirm, Typography, Skeleton, Row, Col, message } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import Copy from 'copy-to-clipboard';
import { IconFont } from '../icons';
import { LoginContext } from '../../App';
const formtaddress = (walletAddress) => {
	return (
		walletAddress.slice(0, 5) + "..." + walletAddress.slice(-5)
	)
}
export const HeaderWallet: React.FC = () => {
	let { setIsLogin } = useContext<any>(LoginContext);
	const [data, setdata] = useState(0)
	const [isShow, setIsShow] = useState(false)
	const [walletAddress, setWalletAddress] = useState('');
	useEffect(() => {
		let address = localStorage.getItem('walletAddress') || '';
		address === '' ? setIsLogin(false) : setWalletAddress(address)
	}, [walletAddress, setIsLogin])
	
	let LoginState = localStorage.getItem('LoginState') || '';
	
	function MyButton(props) {
		const LoginState = props.LoginState;
	   
	if( LoginState == '1') {
		return 	<i className={styles.coinImg1}></i>
	}else {
		return 	<i className={styles.coinImg}></i>
		}
	}
	function upload(){
		window.open('https://bscscan.com/address/'+walletAddress+'','_blank');
	}
	const content = () => {
		return <div style={{ width: "400px" }} className="connectWalletWrap">
			{data ? <>
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
					<Col span={6} style={{ textAlign: 'right' }}><Button size='small' title="change wallet" className={styles['btn-change']}>Change</Button></Col>
				</Row>
				<Row gutter={24}>
					<Col span={24}>
						{/* <i className={styles.coinImg}></i> */}
						<MyButton LoginState={LoginState} />
						<span className={styles.walletAddress}>{formtaddress(walletAddress)}</span>
						<Button size='small' title="upload" className={styles.btnoption} onClick={upload}><IconFont type="icon-upload" /></Button>
						<Button size='small' title="copy" className={styles.btnoption} onClick={() => {
							Copy(walletAddress)
							message.success("Copied to the clipboard");
						}}><IconFont type="icon-copy" /></Button>
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
				visible={isShow}
				onVisibleChange={() => {
					setIsShow(!isShow)
				}}
			>
				<Button className={styles['btn-account-wallet']} onClick={() => { setdata(1) }}>
					{/* <i className={styles.coinImg}></i> */}
					<MyButton LoginState={LoginState} />
					<span className={styles.walletAddress}>{formtaddress(walletAddress)}</span>
					<i><DownOutlined /></i>
				</Button>
				<div className={isShow ? `${styles.mask}` : ''}></div>
			</Popconfirm>
		</div>
	)
}

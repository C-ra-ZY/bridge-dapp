import React, { useState, useContext } from 'react';
import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import metamsk from '../../assets/images/metamsk_30.png';
import styles from './ConnectWallet.module.css'
import { Button, Popconfirm, Skeleton, Form, Typography, Image, Row, Col } from 'antd';
import { IconFont } from '../icons';
import { LoginContext } from '../../App';
import { Conncteii } from '../../utils/Conncteii';
import Web3 from 'web3'
const CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
declare const window: any;

export const ConnectWallet: React.FC = () => {
	let { setIsLogin } = useContext<any>(LoginContext);
	const [loadings, setLoadings] = useState(false)
	const [data, setdata] = useState(0)
	const [isShow, setIsShow] = useState(false)
	const [curNetwork, setCurNetwork] = useState('dfinity')

	const handleConnect = async () => {
		if (curNetwork === 'dfinity') {
			setLoadings(true)
			Conncteii().then(() => {
				setIsLogin(true)
				setLoadings(false)
				localStorage.setItem("LoginState", '1')
			});
		} else {
			const Web3 = require('web3');
			const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
					
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			const data = [{
				 chainId: '0x38'
			}]
			await ethereum.request({method: 'wallet_switchEthereumChain', params:data})
			localStorage.setItem("walletAddress", accounts[0]);
			await web3.eth.getBalance(accounts[0]).then(function (BNB){
			
				let num: number =  Number(web3.utils.fromWei(BNB, 'ether')) 
				let str: string = num.toFixed(4);
				localStorage.setItem("BnbBalance", str)
				localStorage.setItem("LoginState", '0')
			});
			setLoadings(false)
			setIsLogin(true)
		}
	}

	const content = () => {
		return <div style={{ width: "400px" }} className="connectWalletWrap">
			{data ? <>
				<Form layout="vertical">
					<Row gutter={24}>
						<Col span={20}><Typography.Title level={3} className={styles.formtitle}>Connect wallet</Typography.Title></Col>
						<Col span={4} style={{ textAlign: 'right' }}>
							<Button size='small' className={styles['btn-close']} onClick={() => {
								setIsShow(!isShow)
							}}>
								<IconFont type="icon-baseline-close-px" />
							</Button>
						</Col>
					</Row>
					<Typography.Text className={styles.formtext}>Please choose a wallet that your destination address blongs to.</Typography.Text>
					<span className={styles.ctitle}><Typography.Title className={styles.formtitle} level={5}>Choose network</Typography.Title></span>
					<Row justify="space-between">
						<Col>
							<Button type='ghost' className={curNetwork === 'dfinity' ? `${styles['btn-network']} ${styles['active']}` : `${styles['btn-network']}`} style={{ width: 133 }} onClick={() => { setCurNetwork('dfinity') }} >
								<Image src={coinDfinity} className={styles['select-icon']} preview={false} />Dfinity
							</Button>
						</Col>
						<Col>
							<Button type='ghost' className={curNetwork === 'binance' ? `${styles['btn-network']} ${styles['active']}` : `${styles['btn-network']}`} onClick={() => { setCurNetwork('binance') }}>
								<Image src={coinBinance} preview={false} />Binance Smart Chain</Button>
						</Col>
					</Row>
					<span className={styles.ctitle}><Typography.Title className={styles.formtitle} level={5}>Choose wallet</Typography.Title></span>
					{
						curNetwork === 'dfinity'
							?
							<Button block className={styles['btn-connect-wallet']}
							loading={loadings}
							 onClick={() => { handleConnect() }}><Image src={coinDfinity} preview={false} />Dfinity Wallet</Button>
							: <Button block className={styles['btn-connect-wallet']} 
							onClick={() => { handleConnect() }}><Image src={metamsk} preview={false} />MetaMask</Button>
					}
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
			visible={isShow}
			onVisibleChange={() => {
				setIsShow(!isShow)
			}}
		>
			<Button className={styles['btn-connect-wallet']} onClick={() => {
				setTimeout(function () {
					setdata(1)
				}, 500)
			}}>Connect Wallet</Button>
			<div className={isShow ? `${styles.mask}` : ''}></div>
		</Popconfirm>
	)
}
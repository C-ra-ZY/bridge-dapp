import React, { useContext } from 'react'
import { ConnectWallet } from '../connectWallet'
import { HeaderWallet } from '../headerWallet'
import styles from './Header.module.css'
import { Layout,Button } from 'antd';
import { LoginContext } from '../../App';
export const Header: React.FC = () => {
	let {isLogin} = useContext<any>(LoginContext);	
	let IcpBalance = localStorage.getItem('IcpBalance') || '';
	let BnbBalance = localStorage.getItem('BnbBalance') || '';
	let LoginState = localStorage.getItem('LoginState') || '';
	function MyButton(props) {
	
	const LoginState = props.LoginState;
	if( LoginState == '1') {
		return 	<Button type="text" size="large" className={styles.account}>{IcpBalance} IICP</Button>
	
	}else {
		return 	<Button type="text" size="large" className={styles.account}>{BnbBalance} BNB</Button>
	
		}
	}
	return (
		<Layout.Header className={styles['App-header']}>
			<div className="continer">
				<div className={`${styles.flexbox} ${styles['header-inner']}`}>
					<div>
						<span className={styles['App-logo']}>iBridge</span>
					</div>
					<div className={styles['header-right']}>		
						{
							isLogin ? (
							<>
								<div style={{ paddingTop: '4px' }}>
								 <MyButton LoginState={LoginState} />
								</div>
								<HeaderWallet />
							</>
							) : (
								<ConnectWallet />
							)
						}
					</div>
				</div>
			</div>
		</Layout.Header>
	)
}
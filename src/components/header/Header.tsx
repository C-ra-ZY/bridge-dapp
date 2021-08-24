import React, { useContext } from 'react'
import { ConnectWallet } from '../connectWallet'
import { HeaderWallet } from '../headerWallet'
import styles from './Header.module.css'
import { Layout,Button } from 'antd';
import { LoginContext } from '../../App';
export const Header: React.FC = () => {
	let {isLogin,icpBalance} = useContext<any>(LoginContext);	
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
								<Button type="text" size="large" className={styles.account}>{icpBalance} IICP</Button>
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
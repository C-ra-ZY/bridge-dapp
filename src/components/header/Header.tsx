import React from 'react'
import { ConnectWallet } from '../connectWallet'
import { HeaderWallet } from '../headerWallet'
import styles from './Header.module.css'
import { Layout, Button } from 'antd';
import { useAuthWallet } from '../../utils/authWallet/AuthWallet';

export const Header: React.FC = () => {
	let { ...authWallet } = useAuthWallet();
	
	return (
		<Layout.Header className={styles['App-header']}>
			<div className="continer">
				<div className={`${styles.flexbox} ${styles['header-inner']}`}>
					<div>
						<span className={styles['App-logo']}>iBridge</span>
					</div>
					<div className={styles['header-right']}>
						{
							authWallet.isAuthWalletConnected ? (
								<>
									<div style={{ paddingTop: '4px' }}>
										<Button type="text" size="large" className={styles.account} loading={authWallet.amountLoad}>
											{authWallet.amount}
											{
												authWallet.connectWalletType === 'dfinity' ? ' IICP' : ' BNB'
											}
										</Button>
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
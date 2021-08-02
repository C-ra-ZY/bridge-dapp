import React from 'react'
import { ConnectWallet } from '../connectWallet'
import { HeaderWallet } from '../headerWallet'
import styles from './Header.module.css'
import { Layout, Button } from 'antd';

export const Header: React.FC = () => {
	return (
		<Layout.Header className={styles['App-header']}>
			<div className="continer">
				<div className={`${styles.flexbox} ${styles['header-inner']}`}>
					<div>
						<span className={styles['App-logo']}>iBridge</span>
					</div>
					<div className={styles['header-right']}>
						<div style={{paddingTop:'4px'}}><Button type="text" size="large" className={styles.account}>8000.7893 IICP</Button></div>
						<HeaderWallet />
						<ConnectWallet />
					</div>
				</div>
			</div>

		</Layout.Header>
	)
}



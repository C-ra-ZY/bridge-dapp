import React from 'react'
import styles from './Description.module.css';
import { Button, Typography } from 'antd';
const { Title, Text } = Typography;
export const Description: React.FC = () => {
	return (
		<div style={{paddingRight:20}}>
			<Title level={4} className={styles['introduce-title']}>iBridge Introduce</Title>
			<Text className={styles.desc}>The safe, fast and most secure way to bring ICP to Binance Smart Chain and other<br />Networks.Also,You can bring the ICP base on other chains to Dfinity network.</Text>
			<Button type="link" className={styles.btnlink} block>View Proof of Assets</Button>
			<Button type="link" className={styles.btnlink} block>Protocol Fee</Button>
			<Button type="link" className={styles.btnlink} block>User Guide</Button>
			<Button type="link" className={styles.btnlink} block>Recent Transactions</Button>
		</div>
	)
}



import React from 'react'
import logo from '../../assets/images/logo.png';
import styles from './Header.module.css'
import { Layout, Typography,Button } from 'antd';
const { Title, Text } = Typography;

export const Header: React.FC = () => {
    return (
        <Layout.Header className={styles['App-header']}>
            <div className="continer">
                <div className={`${styles.flexbox} ${styles['header-inner']}`}>
                    <div>
                        <span className={styles['App-logo']}>iBridge</span>
                    </div>
                    <div className={styles['header-right']}>
                        <Button className={styles['btn-connect-wallet']}>Connect Wallet</Button>
                    </div>
                </div>
            </div>
        </Layout.Header>
    )
}



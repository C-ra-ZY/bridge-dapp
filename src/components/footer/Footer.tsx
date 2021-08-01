import React from 'react'
import styles from './Footer.module.css'
import { Layout, Typography } from 'antd';
import {Link} from 'react-router-dom';
const { Title, Text } = Typography;
export const Footer: React.FC = () => {
    return (
        <Layout.Footer className={styles.footer}>
            <div className="continer">
                <div className={styles['footer-l']}>
                    <Title level={4} className="color-basic">Terms of Use</Title>
                    <Text style={{ color: '#4B4B63' }}>© 2021 iBridge All rights reserved.</Text>
                </div>
                <div className={styles['footer-r']}>
                    <Link to="#" className={`${styles['footer-link']} ${styles['footer-link-twitter']}`}>twitter</Link>
                    <Link to="#" className={`${styles['footer-link']} ${styles['footer-link-telegram']}`}>telegram</Link>
                </div>
            </div>
        </Layout.Footer>
    )
}



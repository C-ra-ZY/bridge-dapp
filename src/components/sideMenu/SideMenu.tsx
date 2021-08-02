import React, { useState, useEffect } from 'react'
import styles from './SideMenu.module.css'
import logo_ibridge from '../../assets/images/logo_24.png'
import { Layout, Menu, Image } from 'antd';
import { HomeOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom'

export const SideMenu: React.FC = () => {

	const [selectKey, setSelectKey] = useState('home');
	const history = useHistory();
	useEffect(() => {
		const pathname = history.location.pathname.split('/')[1]
		setSelectKey(pathname);
		if (pathname === '') {
			setSelectKey('home');
		} else {
			setSelectKey(pathname);
		}
	}, [history]);



	return (
		<div>
			<Layout.Sider className={styles.sider}>
				<Menu className={styles.menu} selectedKeys={[selectKey]}>
					<Menu.Item key="home" icon={<HomeOutlined />} onClick={() => {
						window.location.href = 'https://www.ibridge.pro';
					}}>Home
					</Menu.Item>

					<Menu.Item key="ibridge" icon={<Image src={logo_ibridge} preview={false} style={{ margin: '-3px 0 0 -4px' }} />} onClick={() => {
						history.push('/ibridge')
					}}>
						iBridge
					</Menu.Item>
				</Menu>
			</Layout.Sider>
		</div>
	)
}

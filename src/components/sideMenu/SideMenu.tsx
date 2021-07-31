import React from 'react'
import styles from './SideMenu.module.css'
import { Layout, Menu } from 'antd';
import {
  HomeOutlined
} from '@ant-design/icons';

export const SideMenu: React.FC = () => {
	return (
		<div>
			<Layout.Sider className={styles.sider}>
				<Menu className={styles.menu}>
					<Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
					<Menu.Item key="2">iBridge</Menu.Item>
				</Menu>
			</Layout.Sider>
		</div>
	)
}

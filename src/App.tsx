import React from 'react';
import styles from './App.module.css';
import { Header, SideMenu, Footer } from './components'
import { Layout, Col, Row } from 'antd';
const { Content } = Layout;
function App() {
	return (
		<div className="App">
			<Header />
			<div className="continer">
				<Row className={styles.main}>
					<Col span={5}>
						<SideMenu />
					</Col>
					<Col span={19}>
						<Content className={styles.content}>Content</Content>
					</Col>
				</Row>
			</div>
			<Footer />
		</div>
	);
}
export default App;



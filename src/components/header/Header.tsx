import React, { useState } from 'react'
import coinDfinity from '../../assets/images/coin-dfinity-30.png';
import coinBinance from '../../assets/images/coin-binance-30.png';
import styles from './Header.module.css'
import { Layout, Button, Popconfirm, Skeleton, Form, Typography, Radio, Select, Image } from 'antd';

const { Option } = Select;


export const Header: React.FC = () => {
	const [data, setdata] = useState(0)
	
	const content = () => {

		return <div
			style={{ width: "440px" }}
		>
			{data ? <>

				<Form layout="vertical" initialValues={{
							'network': 'a',
						}}>
					<Typography.Title level={4}>Connect wallet</Typography.Title>
					<Typography.Text>Please choose a wallet that your destination address blongs to.</Typography.Text>
					<Form.Item
						label="Choose network"
						name="network"
						
					>
						<Radio.Group >
							<Radio.Button value="a">Dfinity</Radio.Button>
							<Radio.Button value="b">Binance Smart Chain</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Choose wallet" >
						<Select
							placeholder={
								<React.Fragment>
									<Image src={coinDfinity} className={styles['select-icon']} />&nbsp; Dfinity Network
								</React.Fragment>
							}
						>
							<Option value="dfinity"><Image src={coinDfinity} className={styles['select-icon']} />Dfinity Network</Option>
							<Option value="female"><Image src={coinBinance} className={styles['select-icon']} />Binance Smart Chain…</Option>
							<Option value="other"><Image src={coinDfinity} className={styles['select-icon']} />other</Option>
						</Select>
					</Form.Item>


				</Form>

			</>
				: <Skeleton active />}
		</div >
	}
	
	return (
		<Layout.Header className={styles['App-header']}>
			<div className="continer">
				<div className={`${styles.flexbox} ${styles['header-inner']}`}>
					<div>
						<span className={styles['App-logo']}>iBridge</span>
					</div>
					<div className={styles['header-right']}>						
						<Popconfirm
							icon={null}
							placement="bottomRight"
							title={content}
						>
							<Button className={styles['btn-connect-wallet']} onClick={() => {
								setTimeout(function () {
									setdata(1)
								}, 500)
							}}>Connect Wallet</Button>
						</Popconfirm>
					</div>
				</div>
			</div>
			
		</Layout.Header>
	)
}



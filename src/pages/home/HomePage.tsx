import React from 'react'
import { SideMenu } from '../../components'
import { Col, Row} from 'antd';
export const HomePage: React.FC = () => {
	return (
	<div className="continer">
				<Row className="main">
					<Col span={5}>
						<SideMenu />
					</Col>
					<Col span={19}>
						<div className="content-wrap">HomePage</div>						
					</Col>
				</Row>
			</div>
	)
}

import { Avatar, Col, Layout, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons';

export default function UnselectedProfile() {

  const { Content } = Layout;
  return (
    <Content style={{ padding: 20}}>
      <Row justify='center'>
        <Col>
          <Avatar size={128} icon={<UserOutlined />} />
        </Col>
      </Row>
      <Row justify='center'>
        <Col>Please select your character</Col>
      </Row>
    </Content>
  );
}
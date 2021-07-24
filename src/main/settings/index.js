import {Card, Row, Col, Button, message} from "antd";
import CheckboxGroups from "./CheckboxGroups";
import BasicTextbox from "./BasicTextbox";
import BasicSwitch from "./BasicSwitch";
import Basic from "./Basic";
import {useDispatch} from 'react-redux';
import {InitActions} from 'app-redux/init';

function HomePage() {
  let inputEmail = '';
  const dispatch = useDispatch();
  const onInputChange = (text) => inputEmail = text;
  const info = () => {
    message.info('Cảnh báo sẽ được gửi tới bạn');
    dispatch(InitActions.setEmail(inputEmail));
  };

  return <div>
    <Card>
          <Card className="gx-card" >
              <Row gutter={[32,32]}>
                <Col span={7}></Col>
                <Col span={5}><h2>Bật cảnh báo:</h2></Col>
                <Col span={7}><BasicSwitch /></Col>
                <Col span={5}></Col>

                <Col span={7}></Col>
                <Col span={5}><h2>Email:</h2></Col>
                <Col span={9}><BasicTextbox inputChange={onInputChange}/></Col>
                <Col span={3}></Col>

                <Col span={7}></Col>
                <Col span={5}><h2>Tần suất:</h2></Col>
                <Col span={9}><CheckboxGroups /></Col>
                <Col span={3}></Col>

                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}><Button type="primary" onClick={info}>Lưu</Button></Col>
                <Col span={6}></Col>
              </Row>
            
          </Card>
    </Card>
  </div>;
}

export default HomePage;
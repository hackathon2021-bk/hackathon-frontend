import {Card, Row, Col, message, Popconfirm, Switch} from "antd";
import Customized from "./Customized";

function HomePage() {
  return <div>
    <Card>
      <Row>
        <Col>
        <Switch defaultChecked />
        <Customized/>
        </Col>
      </Row>
    </Card>
  </div>;
}

export default HomePage;
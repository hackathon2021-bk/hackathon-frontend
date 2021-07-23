import React from "react";
import {Card} from "antd";
import SimpleMap from'./Components/SimpleMap';
import InformationCard from'./Components/InformationCard';

const { Row, Col } = require("antd");

function HomePage() {
  return (
    <Row>
      <Col span={8}>
        <Card className="gx-card" title="Thông tin trạm">
          <InformationCard/>
        </Card>
      </Col>
      <Col span={16}>
        <Card className="gx-card" title="Bản đồ">
          <SimpleMap/>
        </Card>
      </Col>
    </Row>
  );
}

export default HomePage;
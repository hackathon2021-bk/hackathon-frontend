import React from "react";
import {Button, Col, Row} from "antd";

import SimpleTable from "./Table.js";


function HomePage() {
  return (
    <Row justify="center">
      <Col span={24}>
        <SimpleTable/>
      </Col>
      <Col  span={6} offset={6}>
        <Button> <a href='/SonTay.csv' download>Tải xuống</a> </Button>
      </Col>
    </Row>
  );
}

export default HomePage;
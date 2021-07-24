import React from "react";
import {Button, Col, Row, Switch} from "antd";

import SimpleTable from "./Table.js";


function HomePage() {
  const checked = false;

  const onChanged = () => {
    console.log('first checked: ',checked);
    checked = !checked;
    console.log('second checked: ',checked);
  };

  return (
    <Row justify="center">
      <Col>
        <Switch defaultChecked={false} onChange={onChanged()}/>
      </Col>
      <Col span={24}>
        <SimpleTable props={checked} />
      </Col>
      <Col  span={6} offset={6}>
          <a href="/SonTay.csv" download><Button className="gx-mb-0" type="primary">Tải xuống</Button></a>       
      </Col>
    </Row>
  );
}

export default HomePage;
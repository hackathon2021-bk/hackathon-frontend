import React, {useState} from "react";
import {Button, Col, Row, Switch} from "antd";

import SimpleTable from "./Table.js";


function HomePage() {
  const [checked, setChecked] = useState(true);


  const onChanged = () => {
    console.log('first checked: ',checked);
    checked = !checked;
    return checked
  };

  return (
    <Row justify="center">
      <Col>
        <Switch checked={checked} onChange={setChecked}/>
      </Col>
      <Col span={24}>
        <SimpleTable checked={checked} />
      </Col>
      <Col  span={6} offset={6}>
          <a href="/SonTay.csv" download><Button className="gx-mb-0" type="primary">Tải xuống</Button></a>       
      </Col>
    </Row>
  );
}

export default HomePage;
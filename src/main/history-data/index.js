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
      <Row>
        <h3>Thay đổi dạng biểu diễn: &nbsp;</h3>
        <Switch className="gx-mb-3" checked={checked} onChange={setChecked} checkedChildren={"Biểu Đồ"} unCheckedChildren={"Bảng"}/>
      </Row>
      </Col>
      <Col span={24}>
        <SimpleTable checked={checked} />
      </Col>
      <Col>
          <a href="/SonTay.csv" download><Button className="gx-mb-3" type="primary">Tải xuống</Button></a>    
      </Col>
    </Row>
  );
}

export default HomePage;
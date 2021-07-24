import React from 'react';
import { Col, Row } from "antd";
import { BarChart } from "components/Charts/BarChart";
import { LineChart } from "components/Charts/LineChart";

export const StatisticContent = (props) => {
  return (
    <>
      <Row>
        <Col span={10}>
          <LineChart data={props.data.temperature}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
        <Col span={10}>
          <LineChart data={props.data.rainfall}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <LineChart data={props.data.q}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
        <Col span={10}>
          <BarChart data={props.data.h}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
      </Row>
    </>
  );
}
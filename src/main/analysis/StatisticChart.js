import React from 'react';
import { Col, Row } from "antd";
import { BarChart } from "components/Charts/BarChart";
import { LineChart } from "components/Charts/LineChart";

export const StatisticContent = (props) => {
  return (
    <>
      <Row style={{ margin: '24px 12px' }}>
        <Col span={12}>
          <LineChart
            data={props.data.temperature}
            title='Nhiệt độ trung bình'
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
        <Col span={12}>
          <LineChart data={props.data.rainfall}
            title='Lượng mưa'
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
      </Row>
      <Row style={{ margin: '12px 12px' }}>
        <Col span={12}>
          <LineChart data={props.data.q}
            title='Lưu lượng'
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
        <Col span={12}>
          <BarChart data={props.data.h}
            title='Mực nước'
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          />
        </Col>
      </Row>
    </>
  );
}
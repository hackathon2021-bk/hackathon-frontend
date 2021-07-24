import React from 'react';
import { Col, Row } from "antd";
import { BarChart } from "components/Charts/BarChart";
import { LineChart } from "components/Charts/LineChart";

const getInitialData = (usingData, key) => {
  // let usingData = data.data[id];
  const initialData = {
    temperature: [{
      name: 'Average temperature',
      data: usingData[key].avg_temp,
    }],
    q: [{
      name: 'Discharge',
      data: usingData[key].Q,
    }],
    h: [{
      name: 'Hydology',
      data: usingData[key].H,
    }],
    rainfall: [{
      name: 'Rainfall',
      data: usingData[key].rainfall,
    }],
    evaporation: [{
      name: 'Evaporation',
      data: usingData[key].evaporation,
    }]
  };
  return initialData;
}

export const StatisticContent = (props) => {
  // const dataContent = getInitialData(props.data, props.key);
  const TemperatureConstant = {
    title: {
      text: 'Temperature hhshh',
      // floating: true,
      // offsetY: 330,
      // align: 'center',
      // style: {
      //   color: '#444'
      // }
    }
  };
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
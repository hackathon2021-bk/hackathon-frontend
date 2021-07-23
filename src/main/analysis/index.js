import React, { useState } from "react";
// import {Bar, BarChart, ResponsiveContainer, Tooltip} from "recharts";
import { Col, Row } from "antd";
import data from "data/data";
import { BarChart } from "components/Charts/BarChart";
import { LineChart } from "components/Charts/LineChart";

const initialData = {
  temperature: [{
    name: 'Average temperature',
    data: data.data[0].data_yearly.avg_temp,
  }],
  q: [{
    name: 'Discharge',
    data: data.data[0].data_yearly.Q,
  }],
  h: [{
    name: 'Hydology',
    data: data.data[0].data_yearly.H,
  }],
  rainfall: [{
    name: 'Rainfall',
    data: data.data[0].data_yearly.rainfall,
  }],
  evaporation: [{
    name: 'Evaporation',
    data: data.data[0].data_yearly.evaporation,
  }]
}

console.log(data.data[0].data_yearly.avg_temp);

const HomePage = () => {
  const [statisticData, setStatisticData] = useState(initialData);

  return (
    <>
      <Row>
        <Col span={10}>
          <BarChart data={statisticData.temperature}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col>
        <Col span={10}>
          <BarChart data={statisticData.h}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <LineChart data={statisticData.q}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col>
        <Col span={10}>
          <LineChart data={statisticData.rainfall}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col>
      </Row>
    </>)
}

export default HomePage;
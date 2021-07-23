import React from "react";
import {Bar, BarChart, ResponsiveContainer, Tooltip} from "recharts";
import {Col, Row} from "antd";

const data = [
  {name: 'JAN', lastYear: 200, thisYear: 600,},
  {name: 'FEB', lastYear: 500, thisYear: 900,},
  {name: 'MAR', lastYear: 700, thisYear: 1200,},
  {name: 'JUN', lastYear: 500, thisYear: 900,},
  {name: 'AUG', lastYear: 200, thisYear: 800,},
  {name: 'SEP', lastYear: 400, thisYear: 400,},
  {name: 'OCT', lastYear: 400, thisYear: 500,},
  {name: 'NOV', lastYear: 400, thisYear: 1200,},
  {name: 'DEC', lastYear: 200, thisYear: 800,},
];

function HomePage() {
  return <Col xl={13} lg={12} md={24} sm={12} xs={12}>

  <ResponsiveContainer className="gx-barchart" width="100%" height={70}>
    <BarChart data={data}
              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
      <Tooltip/>
      <Bar dataKey="lastYear" stackId="a" fill="#038FDE" />
      <Bar dataKey="thisYear" stackId="a" fill="#FE9E15" />
    </BarChart>
  </ResponsiveContainer>
</Col>;
}

export default HomePage;
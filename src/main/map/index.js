import React, { useState } from "react";
import {Card} from "antd";
import SimpleMap from'./Components/SimpleMap';
import InformationCard from'./Components/InformationCard';
import { useDispatch, useSelector } from "react-redux";

const { Row, Col } = require("antd");

function HomePage() {

  const data = useSelector((state) => state.map.stationData);
  const stationId = useSelector((state) => state.map.stationId);
  const lstSubscribedStationId = useSelector((state) => state.map.lstSubscribedStationId);
  
  const getStationData = (data, stationId) =>{
    let dtPoint = data[stationId-1];
    return {
        'id': stationId,
        'known': dtPoint['known'],
        'name': dtPoint['name'],
        'latitude': dtPoint['latitude'],
        'longitude': dtPoint['longitude'],
        'temperature': Math.round(dtPoint['data_daily']['avg_temp'][Math.floor(Math.random() * dtPoint['data_daily']['avg_temp'].length)]).toString(),
        'evaporation': Math.round(dtPoint['data_daily']['evaporation'][Math.floor(Math.random() * dtPoint['data_daily']['evaporation'].length)]).toString(),
        'water_level': Math.round(dtPoint['data_daily']['H'][0]).toString(),
        'discharge': Math.round(dtPoint['data_daily']['Q'][Math.floor(Math.random() * dtPoint['data_daily']['Q'].length)]).toString(),
        'rainfall': Math.round(dtPoint['data_daily']['rainfall'][Math.floor(Math.random() * dtPoint['data_daily']['rainfall'].length)]).toString(),
        'humidity': Math.round(dtPoint['data_daily']['humidity'][Math.floor(Math.random() * dtPoint['data_daily']['humidity'].length)]).toString(),
    }
  }
  const curStationData =  getStationData(data, stationId);

  const props = {
    data: data,
    stationId, stationId,
    curStationData: curStationData,
    lstSubscribedStationId: lstSubscribedStationId
  }

  return (
    <Row>
      <Col span={8}>
        <Card className="gx-card" title="Thông tin trạm">
          <InformationCard props={props} />
        </Card>
      </Col>
      <Col span={16}>
        <Card className="gx-card" title="Bản đồ">
          <SimpleMap props={props}  />
        </Card>
      </Col>
    </Row>
  );
}

export default HomePage;
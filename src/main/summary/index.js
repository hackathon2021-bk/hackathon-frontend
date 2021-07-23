import data from "data/data";
import {Card, Col, Row} from "antd";
import BaseMap from "./BaseMap";
import { useSelector } from "react-redux";
import InformationCard from "./InformationCard";

export default function HomePage(props) {
  const stationId = useSelector((state) => state.map.stationId);

  const getStationData = (data, stationId) =>{
    console.log('stationId :>> ', stationId);
    let dtPoint = data['data'][stationId];
    console.log('dtPoint :>> ', dtPoint);
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

  const curStationData = getStationData(data, stationId);

  return <>
    <Row>
      <Col span={8}>
        <Card className="gx-card" title={`${curStationData['name']}`}>
          <div style={{padding:"10px"}}>
            <BaseMap/>
          </div>
          <div style={{padding:"10px"}}>
            <InformationCard/>
          </div>
        </Card>
      </Col>
      <Col span={16}>
        <Card>
          Chart
        </Card>
      </Col>
    </Row>
    
  </>;
}

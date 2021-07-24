import data from "data/data";
import { Card, Col, Row, message } from "antd";
import BaseMap from "./BaseMap";
import { useSelector } from "react-redux";
import InformationCard from "./InformationCard";
import { BarChart } from "../../components/Duy-Charts/BarChart";
import { LineChart } from "../../components/Duy-Charts/LineChart";
import { AreaChart } from "../../components/Duy-Charts/AreaChart";
import {sendMail } from 'util/sendMail';
export default function HomePage(props) {
  const stationId = useSelector((state) => state.map.stationId);
  const prepareData = (limit) => {
    let pred = data['data'][stationId]['data_monthly'];
    let abv_h = data['threshold']['H'] + 1;
    let abv_q = data['threshold']['Q'] + 1;

    const alertMes = () => {
      // message.error('Vài chỉ số vượt quá ngưỡng an toàn, thông tin cảnh báo chi tiết sẽ được gửi về mail bạn đã đăng ký!');
      let sentMessage = "Ahihi send ne` :))";
      sendMail(sentMessage);
    }; 
    alertMes();
    return {
      temperature: [{
        name: 'Average temperature',
        data: pred.avg_temp.slice(0,limit)
      }],
      q: [{
        name: 'Discharge',
        data: [...pred.Q.slice(0,limit-1), abv_q],
      }],
      h: [{
        name: 'Hydology',
        data: [...pred.H.slice(0,limit), abv_h],
      }],
      rainfall: [{
        name: 'Rainfall',
        data: pred.rainfall.slice(0,limit),
      }],
      evaporation: [{
        name: 'Evaporation',
        data: pred.evaporation.slice(0,limit),
      }]
    }
  }

  const getStationData = (data, stationId) => {
    // console.log('stationId :>> ', stationId);
    let dtPoint = data['data'][stationId];
    // console.log('dtPoint :>> ', dtPoint);
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
  
  const curHour = (new Date()).getHours();
  const categories = [...Array(curHour + 1).keys()].map((hour) => `${hour}:00`);
  const realtimeData = prepareData(curHour + 1);
  
  return <>
    <Row>
      <Col span={6}>
        <Card className="gx-card" title={`${curStationData['name']}`}>
          <div style={{ padding: "10px" }}>
            <BaseMap />
          </div>
          <div style={{ padding: "10px" }}>
            <InformationCard />
          </div>
        </Card>
      </Col>
      <Col span={18}>
        <Card>
          Chart

          <Row>
            <Col span={24}>
              <LineChart data={realtimeData.q}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} 
                title={"Average Discharge for next 7 Days"} 
                ytitle={"Discharge"} 
                xtitle={"Days"} 
                categories={categories}
                />
            </Col>
          </Row>
          <Row >
            <Col span={12}>
              <LineChart data={realtimeData.h}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} 
                title={"Average Water Level for next 7 Days"} 
                ytitle={"Water Level"} 
                xtitle={"Days"} 
                color={"#be58e0"}
                categories={categories}
                />
            </Col>
            <Col span={12}>
              <AreaChart data={realtimeData.evaporation}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} 
                title={"Average Evaporation for next 7 Days"} 
                categories={categories}
                />
                
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BarChart data={realtimeData.rainfall} title={"Average Rainfall for next 7 Days"} categories={categories}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} color={'#5faae3'}/>
            </Col>
            <Col span={12}>
              <BarChart data={realtimeData.temperature} title={"Average Temperature for next 7 Days"} categories={categories}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

  </>;
}

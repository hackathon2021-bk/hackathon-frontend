import data from "data/data";
import { Card, Col, Row, message } from "antd";
import BaseMap from "./BaseMap";
import { useSelector } from "react-redux";
import InformationCard from "./InformationCard";
// giimport InformationCard from "main/map/Components/InformationCard";
import { BarChart } from "../../components/Duy-Charts/BarChart";
import { LineChart } from "../../components/Duy-Charts/LineChart";
import { AreaChart } from "../../components/Duy-Charts/AreaChart";
import { sendMail } from 'util/sendMail';
import { useEffect } from "react";

export default function HomePage(props) {
  const stationId = useSelector((state) => state.map.stationId);
  console.log('final data :>> ', data);

  const prepareData = (limit) => {
    let pred = data['data'][stationId - 1]['data_monthly'];
    let abv_h = data['threshold']['H'] + 1;
    let abv_q = data['threshold']['Q'] + 1;

    return {
      temperature: [{
        name: 'Average temperature',
        data: pred.avg_temp.slice(0, limit)
      }],
      q: [{
        name: 'Discharge',
        data: [...pred.Q.slice(0, limit - 1), abv_q],
      }],
      h: [{
        name: 'Hydology',
        data: [...pred.H.slice(0, limit), abv_h],
      }],
      rainfall: [{
        name: 'Rainfall',
        data: pred.rainfall.slice(0, limit),
      }],
      evaporation: [{
        name: 'Evaporation',
        data: pred.evaporation.slice(0, limit),
      }]
    }
  }

  const getStationData = (data, stationId) => {
    // console.log('stationId :>> ', stationId);
    let dtPoint = data['data'][stationId - 1];
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
  const alertMes = (email, curStationData) => {
    message.error('Vài chỉ số vượt quá ngưỡng an toàn, thông tin cảnh báo chi tiết sẽ được gửi về mail bạn đã đăng ký!');
    let sentMessage = `Mực nước của ${curStationData.name} là ${curStationData.water_level} và đã đạt mức nguy hiểm, hãy nâng mức độ cảnh báo.`;
    // message.error(sentMessage);
    sendMail(sentMessage, email);
  };

  const email = useSelector((state) => state.init.email);
  const curStationData = getStationData(data, stationId);

  useEffect(() => {
    alertMes(email, curStationData);
  }, []);


  const curHour = (new Date()).getHours();
  const categories = [...Array(curHour + 1).keys()].map((hour) => `${hour}:00`);
  const realtimeData = prepareData(curHour + 1);
  console.log(realtimeData);
  return <>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={8}>
        <Card className="gx-card" title={`${curStationData['name']}`} style={{ wordBreak: 'break-word', }}>
          {/* {curStationData['name']} */}
          <div style={{ padding: "10px" }}>
            <BaseMap />
          </div>
          <div style={{ padding: "0px" }}>
            <InformationCard />
          </div>
        </Card>
      </Col>
      <Col span={16}>
        <Card>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24} className="gutter-row">
              <LineChart data={realtimeData.q}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                title={"Dữ Liệu Lưu lượng Thời Gian Thực"}
                ytitle={"Lưu lượng"}
                xtitle={"Ngày"}
                categories={categories}
              />
            </Col>
          </Row >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24} className="gutter-row">
              <LineChart data={realtimeData.h}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                title={"Dữ Liệu Mực Nước Thời Gian Thực"}
                ytitle={"Mực nước"}
                xtitle={"Ngày"}
                color={"#be58e0"}
                categories={categories}
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24} className="gutter-row">
              <AreaChart data={realtimeData.evaporation}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                color={"#f0ac37"}
                title={"Dữ Liệu Bay Hơi Thời Gian Thực"}
                categories={categories}
              />

            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24} className="gutter-row">
              <BarChart data={realtimeData.rainfall} title={"Dữ Liệu Lượng Mưa Thời Gian Thực"} categories={categories}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} color={'#5faae3'} />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24} className="gutter-row">
              <BarChart data={realtimeData.temperature} title={"Dữ Liệu Nhiệt Độ Thời Gian Thực"} categories={categories}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

  </>;
}

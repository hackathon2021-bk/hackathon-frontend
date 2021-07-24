import { useSelector } from "react-redux";
import { BarChart } from "./Components/BarChart";
import { LineChart } from "./Components/LineChart";
import { AreaChart } from "./Components/AreaChart";

import data from "data/data";

const { Row, Col } = require("antd");

export default function HomePage(props) {
  const stationId = useSelector((state) => state.init.stationId);
  const prepareData = () => {
    let pred = data['data'][stationId]['data_predict'];
    return {
      temperature: [{
        name: 'Average temperature',
        data: pred.avg_temp,
      }],
      q: [{
        name: 'Discharge',
        data: pred.Q,
      }],
      h: [{
        name: 'Hydology',
        data: pred.H,
      }],
      rainfall: [{
        name: 'Rainfall',
        data: pred.rainfall,
      }],
      evaporation: [{
        name: 'Evaporation',
        data: pred.evaporation,
      }]
    }
  }
  const predictData = prepareData();
  console.log(predictData);
  return (
    <>
      <Row style={{marginTop: 5}}>
        <Col span={24}>
          <LineChart data={predictData.q}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} 
            title={"Average Discharge for next 7 Days"} 
            ytitle={"Discharge"} 
            xtitle={"Days"} 
            categories={['1','2','3','4','5','6','7']}
            />
        </Col>
        {/* <Col span={10}>
          <LineChart data={predictData.rainfall}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col> */}
      </Row>
      <Row style={{marginTop: 5}}>
        <Col span={12}>
          <LineChart data={predictData.h}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} 
            title={"Average Water Level for next 7 Days"} 
            ytitle={"Water Level"} 
            xtitle={"Days"} 
            color={"#be58e0"}
            categories={['1','2','3','4','5','6','7']}
            />
        </Col>
        <Col span={12}>
          <AreaChart data={predictData.evaporation}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} 
            title={"Average Evaporation for next 7 Days"} 
            categories={['1','2','3','4','5','6','7']}
            />
            
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <BarChart data={predictData.rainfall} title={"Average Rainfall for next 7 Days"} categories={['1','2','3','4','5','6','7']}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} color={'#5faae3'}/>
        </Col>
        <Col span={12}>
          <BarChart data={predictData.temperature} title={"Average Temperature for next 7 Days"} categories={['1','2','3','4','5','6','7']}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col>
      </Row>
    </>);
}


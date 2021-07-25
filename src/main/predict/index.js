import { useSelector } from "react-redux";
import { BarChart } from "../../components/Duy-Charts/BarChart";
import { LineChart } from "../../components/Duy-Charts/LineChart";
import { AreaChart } from "../../components/Duy-Charts/AreaChart";

import data from "data/data";
import { useState } from "react";

const { Row, Col, Slider } = require("antd");

export default function HomePage(props) {
  const stationId = useSelector((state) => state.init.stationId);
  const prepareData = (limit) => {
    let pred = data['data'][stationId-1]['data_predict']; // stationId -1 de lay dung offset
    return {
      temperature: [{
        name: 'Average temperature',
        data: pred.avg_temp.slice(0,limit),
      }],
      q: [{
        name: 'Discharge',
        data: pred.Q.slice(0,limit),
      }],
      h: [{
        name: 'Hydology',
        data: pred.H.slice(0,limit),
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

  const [predictData, setPredictData] = useState(prepareData(7));
  const [categories, setCategories] = useState([...Array(7).keys()].map((idx) => `${idx + 1}`));

  const onChangeSlider = (value) => {
    setPredictData(prepareData(value));
    setCategories([...Array(value).keys()].map((idx) => `${idx + 1}`));
  };

  return (
    <>
      <h3>Chọn Khung Thời Gian Dự Đoán</h3>
      <Slider defaultValue={7} max={30} dots onChange={onChangeSlider}/>
      <Row>
        <Col span={24}>
          <LineChart data={predictData.q}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            title={"Dự Đoán Lưu Lượng Trong Tương Lai"}
            ytitle={"Discharge"}
            xtitle={"Days"}
            categories={categories}
          />
        </Col>
        {/* <Col span={10}>
          <LineChart data={predictData.rainfall}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col> */}
      </Row>
      <Row >
        <Col span={12}>
          <AreaChart data={predictData.h}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            title={"Dự Đoán Mực Nước Trong Tương Lai"}
            ytitle={"Water Level"}
            xtitle={"Days"}
            // color={"#be58e0"}
            color={'#5faae3'}
            categories={categories}
          />
        </Col>
        <Col span={12}>
          <AreaChart data={predictData.evaporation}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            title={"Dự Đoán Bốc Hơi Trong Tương Lai"}
            categories={categories}
            color={"#e88d84"}
          />

        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <BarChart data={predictData.rainfall} title={"Dự Đoán Lượng Mưa Trong Tương Lai"} categories={categories}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} color={'#5faae3'} />
        </Col>
        <Col span={12}>
          <BarChart data={predictData.temperature} title={"Dự Đoán Nhiệt Độ Trong Tương Lai"} categories={categories}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
        </Col>
      </Row>
    </>);
}


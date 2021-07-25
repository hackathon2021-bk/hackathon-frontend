import React from "react";
import {Row, Col, Card, Divider, Table} from "antd";
import SonTay from "data/SonTay"
import { useDispatch, useSelector } from "react-redux";
import { LineChart } from "../../components/Duy-Charts/LineChart";
import { AreaChart } from "components/Duy-Charts/AreaChart";

const columns = [{
  title: 'Ngày',
  dataIndex: 'date',
  width: 150,
}, {
  title: 'Nhiệt độ TB',
  dataIndex: 'avgtemp',
  width: 150,
}, {
  title: 'Bay hơi',
  width: 150,
  dataIndex: 'evaporation',
},{
  title: 'Mực nước',
  width: 150,
  dataIndex: 'H',
},{
title: 'Lưu lượng nước',
width: 150,
dataIndex: 'Q'
},{
title: 'Lượng mưa',
  width: 150,
  dataIndex: 'rainfall'
},{
  title: 'Mực nước dự đoán',
  width: 150,
  dataIndex: 'predict_waterlevel'
},{
  title: 'Lưu lượng dự đoán',
  width: 150,
  dataIndex: 'predict_discharge'
}

];


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min) / 100; //The maximum is exclusive and the minimum is inclusive
}


const SimpleTable = (props) => {
  const dataStation = useSelector((state) => state.map.stationData);
  const stationId = useSelector((state) => state.map.stationId);
  const getStationData = (data, stationId) =>{
    let dtPoint = data[stationId-1];
    return {
        'id': stationId,
        'known': dtPoint['known'],
        'name': dtPoint['name'],
    }
  }
  const curStationData =  getStationData(dataStation, stationId);

  const data = [];

  for (let i = 4382; i >=0; i--) {
    let waterlevel = SonTay[getRandomInt(4382- stationId)].H;
    let discharge = SonTay[getRandomInt(4382- stationId)].Q;
    data.push({
        key: 4382-i,
        date: SonTay[i].date,
        avgtemp: SonTay[getRandomInt(4382-stationId)].avgtemp,
        evaporation: SonTay[getRandomInt(4382- stationId)].evaporation,
        H: waterlevel ,
        Q: discharge,
        rainfall: SonTay[getRandomInt(4382- stationId)].rainfall,
        predict_waterlevel: Math.round(waterlevel * getRandomIntInRange(90,110), 2),
        predict_discharge: Math.round(discharge  * getRandomIntInRange(90,110), 2),
    });
  }
  console.log("bool props.checked >>", props.checked);

  const data_chart= {
    waterlevel: [
      {
      name: 'Mực nước',
      data: data.map(p => p.H).slice(1).slice(-30)
      },
      {
        name:'Mực nước dự đoán',
        data:data.map(p => p.predict_waterlevel).slice(1).slice(-30)
      }
  ],
    discharge: [{
      name: 'Lưu lượng', 
      data: data.map(p => p.Q).slice(1).slice(-30)
    },
    {
      name: 'Lưu lượng dự đoán',
      data:data.map(p=> p.predict_discharge).slice(1).slice(-30)
    }]
  };

  const categories = [...Array(30).keys()].map((idx) => `${idx + 1}`);

  return props.checked ? 
  (
    <Card title={<span  style={{fontSize: '20px'}}>{curStationData.name}</span>}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24} className="gutter-row">
          <LineChart data={data_chart.waterlevel}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            title={"Dữ Liệu Mực nước"}
            ytitle={"Mực nước"}
            xtitle={"Ngày"}
            labels={false}
            categories={categories}
          />
        </Col>
      </Row >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24} className="gutter-row">
          <LineChart data={data_chart.discharge}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            title={"Dữ Liệu Lưu lượng"}
            ytitle={"Lưu lượng"}
            xtitle={"Ngày"}
            colors={['#a054e3', '#d98e50']}
            labels={false}
            categories={categories}
          />
        </Col>
      </Row>
    </Card>
  ): (
    <Card title={<span  style={{fontSize: '20px'}}>{curStationData.name}</span>}>
      <Table className="gx-table-responsive" columns={columns} dataSource={data} pagination={{pageSize: 50}}
             scroll={{y: 450}}/>
    </Card>
  );
};

export default SimpleTable;

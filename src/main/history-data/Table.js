import React from "react";
import {Card, Divider, Table} from "antd";
import SonTay from "data/SonTay"
import { useDispatch, useSelector } from "react-redux";

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
        date: SonTay[getRandomInt(4382- stationId)].date,
        avgtemp: SonTay[getRandomInt(4382-stationId)].avgtemp,
        evaporation: SonTay[getRandomInt(4382- stationId)].evaporation,
        H: waterlevel ,
        Q: discharge,
        rainfall: SonTay[getRandomInt(4382- stationId)].rainfall,
        predict_waterlevel: Math.round(waterlevel * getRandomIntInRange(90,110), 2),
        predict_discharge: Math.round(discharge  * getRandomIntInRange(90,110), 2),
    });
  }
  console.log("bool props.checked >>", props.props.checked);
  return props.checked ? 
  (
    <Card title={<span  style={{fontSize: '20px'}}>{curStationData.name}</span>}>
      hello
    </Card>
  )
  : (
    <Card title={<span  style={{fontSize: '20px'}}>{curStationData.name}</span>}>
      <Table className="gx-table-responsive" columns={columns} dataSource={data} pagination={{pageSize: 50}}
             scroll={{y: 450}}/>
    </Card>
  );
};

export default SimpleTable;

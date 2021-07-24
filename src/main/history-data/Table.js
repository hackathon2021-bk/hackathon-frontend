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
}];

  
const data = [];
for (let i = 4382; i >=0; i--) {
data.push({
    key: 4382-i,
    date: SonTay[i].date,
    avgtemp: SonTay[i].avgtemp,
    evaporation: SonTay[i].evaporation,
    H: SonTay[i].H,
    Q: SonTay[i].Q,
    rainfall: SonTay[i].rainfall,
});
}

const SimpleTable = () => {
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

  return (
    <Card title={<span  style={{fontSize: '20px'}}>{curStationData.name}</span>}>
      <Table className="gx-table-responsive" columns={columns} dataSource={data} pagination={{pageSize: 50}}
             scroll={{y: 240}}/>
    </Card>
  );
};

export default SimpleTable;

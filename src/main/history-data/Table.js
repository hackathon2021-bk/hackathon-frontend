import React from "react";
import {Card, Divider, Table} from "antd";
import SonTay from "data/SonTay"

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
  return (
    <Card title="Fix Header">
      <Table className="gx-table-responsive" columns={columns} dataSource={data} pagination={{pageSize: 50}}
             scroll={{y: 240}}/>
    </Card>
  );
};

export default SimpleTable;

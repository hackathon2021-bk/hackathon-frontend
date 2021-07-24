import React, { useState } from "react";
import { useSelector } from "react-redux";
import data from "data/data";
import styled from "styled-components";
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { StatisticContent } from "./StatisticChart";

const SelectWrapper = styled.div`
margin-bottom: 24px;
`;
const AnalysisPage = () => {

  const stationId = useSelector((state) => state.map.stationId);
  const getInitialData = (id, key_) => {
    let key = key_ || 'data_yearly';
    let usingData = data.data[id];
    const initialData = {
      temperature: [{
        name: 'Average temperature',
        data: usingData[key].avg_temp,
      }],
      q: [{
        name: 'Discharge',
        data: usingData[key].Q,
      }],
      h: [{
        name: 'Hydology',
        data: usingData[key].H,
      }],
      rainfall: [{
        name: 'Rainfall',
        data: usingData[key].rainfall,
      }],
      evaporation: [{
        name: 'Evaporation',
        data: usingData[key].evaporation,
      }]
    };
    return initialData;
  }

  const [currentSelectKey, setCurrentSelectKey] = useState('data_yearly');
  const statisticData = getInitialData(stationId, currentSelectKey);
  const [currentSelect, setCurrentSelect] = useState('day');
  const handleSelectChange = (e) => {
    setCurrentSelect(e.key);
    switch (e.key) {
      case 'day':
        setCurrentSelectKey('data_daily');
        break;
      case 'month':
        setCurrentSelectKey('data_monthly');
        break;
      case 'week':
        setCurrentSelectKey('data_weekly');
        break;
      case 'year':
        setCurrentSelectKey('data_yearly');
        break;
    }
  }

  return (
    <>
      <SelectWrapper >
        <Menu id="pagemenu" onClick={handleSelectChange} selectedKeys={[currentSelect]} mode="horizontal">
          <Menu.Item key="day" icon={<MailOutlined />} style={{ marginBottom: '0px !important' }}>
            Theo ngày
          </Menu.Item>
          {/* <Menu.Item key="week" icon={<AppstoreOutlined />} style={{ marginBottom: '0px !important' }}>
            Theo tuần
          </Menu.Item> */}
          <Menu.Item key="month" icon={<AppstoreOutlined />} style={{ marginBottom: '0px !important' }}>
            Theo tháng
          </Menu.Item>
          <Menu.Item key="year" icon={<AppstoreOutlined />} style={{ marginBottom: '0px !important' }}>
            Theo năm
          </Menu.Item>
        </Menu>
      </SelectWrapper>
      <StatisticContent data={statisticData} />
    </>)
}

export default AnalysisPage;
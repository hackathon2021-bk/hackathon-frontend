import React, {Component} from "react";
import {AutoComplete, Card, Col, Row, Text} from "antd";

import {MapActions} from 'app-redux/map';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd/lib/radio";

const InformationCard = () => {
    const dispatch = useDispatch();
    const stationId = useSelector((state) => state.map.stationId);
    const data = useSelector((state) => state.map.stationData);
      
    const state = {
        dataSource: [],
    }

    const getStationData = (data, stationId) =>{
        console.log('stationId :>> ', stationId);
        let dtPoint = data[stationId-1];
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

    const curStationData =  getStationData(data, stationId);

    const curSubscribedStations = useSelector((state) => state.map.lstSubscribedStationId);


    const getUpdatedData = (data, stationId) => {
        data[stationId-1]['known'] = 1;
        return data;
    }

    const handleSearch = (value) => {
        state.dataSource = !value ? [] : [
                value,
                value + value,
                value + value + value,
                ];
    }

    const handleButtonClick = ()  => {  
        console.log('curSubscribedStations :>> ', curSubscribedStations);
        console.log('currentStation :>> ', stationId);
        console.log('currentStationData Name :>> ', curStationData['name']);
        console.log('curSubscribedStations.indexOf(stationId) :>> ', curSubscribedStations.indexOf(stationId));
        if (curSubscribedStations.indexOf(stationId) == -1) { // n eu tram chua dc subsribe
            let newStationLst = curSubscribedStations.push(stationId);
            let newData = getUpdatedData(data, stationId);

            MapActions.updateStationData(newData);
            MapActions.updateSubscribedStationId(newStationLst);
            console.log('newData :>> ', newData);
        }
    };  

    // console.log(`curStationData.known :>> images/tramthuydien${curStationData.id}.png`);
    return (
        curStationData.known === 1 ?
        <>  
            <Row  style={{ marginBottom: 8 }} >
                <Col className="gutter-row"  span={8}>
                    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                        Tìm trạm
                    </div>
                </Col>
                <Col className="gutter-row"  span={16}>
                    <AutoComplete
                    dataSource={state.dataSource}
                    style={{width: 200}}
                    onSearch={handleSearch}
                    placeholder="input here"
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 8 }} > 
                <Col className="gutter-row" >
                    <div className="gx-mr-3">
                        <img width="400px" height="300px" src={`images/tramthuydien${curStationData.id}.png`} alt='flying'/>
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "25px"} }>
                    <b>{curStationData['name']}</b>
                </Col>
            </Row>
            
            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col  span={8} className="gutter-row" style={{fontSize: "large"}}>
                    Nhiệt độ:
                </Col>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['temperature']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                Mực nước:
                </Col>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['water_level']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                Lưu lượng:
                </Col>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['discharge']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                Lượng mưa:
                </Col>
                <Col span={8}  className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['rainfall']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                Độ ẩm:
                </Col>
                <Col  span={8} className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['humidity']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                Bay hơi:
                </Col>
                <Col span={8} className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['evaporation']}
                </Col>
            </Row>

        </> : 
        <> 
            <Row  style={{ marginBottom: 8 }} >
                <Col className="gutter-row"  span={8}>
                    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                        Tìm trạm
                    </div>
                </Col>
                <Col className="gutter-row"  span={16}>
                    <AutoComplete
                    dataSource={state.dataSource}
                    style={{width: 200}}
                    // onSelect={onSelect}
                    onSearch={handleSearch}
                    placeholder="input here"
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 8 }} > 
                <Col className="gutter-row" >
                    <div className="gx-mr-3">
                        <img width="400px" height="300" src={`images/tramthuydien${curStationData.id}.png`} alt='flying'/>
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "25px"}}>
                    <b>{curStationData['name']}</b>
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                Bạn chưa đăng ký nhận dữ liệu của trạm này 
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Button  className="gx-mb-0" type="primary" onClick={handleButtonClick}>Đăng ký</Button>
            </Row>
        </>
    );
    
}

export default InformationCard;
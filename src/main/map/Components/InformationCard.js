import React, {Component} from "react";
import {AutoComplete, Card, Col, Row, Text} from "antd";

import {MapActions} from 'app-redux/map';
import { useDispatch, useSelector } from "react-redux";
import data from "data/data";

function onSelect(value) {
}


const InformationCard = () => {
    const getStationData = (data, stationId) =>{
        console.log('stationId :>> ', stationId);
        let dtPoint = data['data'][stationId];
        console.log('dtPoint :>> ', dtPoint);
        return {
            'id': stationId,
            'known': dtPoint['known'],
            'name': dtPoint['name'],
            'latitude': dtPoint['latitude'],
            'longitude': dtPoint['longitude'],
            'temperature': Math.round(dtPoint['data_daily']['avg_temp'][Math.floor(Math.random() * dtPoint['data_daily']['avg_temp'].length)]).toString(),
            'evaporation': Math.round(dtPoint['data_daily']['evaporation'][Math.floor(Math.random() * dtPoint['data_daily']['evaporation'].length)]).toString(),
            'water_level': Math.round(dtPoint['data_daily']['H'][Math.floor(Math.random() * dtPoint['data_daily']['H'].length)]).toString(),
            'discharge': Math.round(dtPoint['data_daily']['Q'][Math.floor(Math.random() * dtPoint['data_daily']['Q'].length)]).toString(),
            'rainfall': Math.round(dtPoint['data_daily']['rainfall'][Math.floor(Math.random() * dtPoint['data_daily']['rainfall'].length)]).toString(),
            'humidity': Math.round(dtPoint['data_daily']['humidity'][Math.floor(Math.random() * dtPoint['data_daily']['humidity'].length)]).toString(),
        }
    }

    const dispatch = useDispatch();
    
    // lay station mac dinh 
    const stationId = useSelector((state) => state.map.stationId);

    const curStationData =  getStationData(data, stationId);

    const state = {
        dataSource: [],
    }

    const handleSearch = (value) => {
        state.dataSource = !value ? [] : [
                value,
                value + value,
                value + value + value,
                ];
    }

    console.log(`curStationData.known :>> images/tramthuydien${curStationData.id}.png`);
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
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    placeholder="input here"
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 8 }} > 
                <Col className="gutter-row" >
                    <div className="gx-mr-3">
                        <img width="400px" height="300px" src={`images/tramthuydien${curStationData.id+1}.png`} alt='flying'/>
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                    {curStationData['name']}
                </Col>
            </Row>
            
            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                    Nhiệt độ:
                </Col>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['temperature']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                Mực nước:
                </Col>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['water_level']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                Lưu lượng :
                </Col>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['discharge']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                Lượng mưa :
                </Col>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['rainfall']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                Độ ẩm:
                </Col>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                {curStationData['humidity']}
                </Col>
            </Row>

            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                Bay hơi:
                </Col>
                <Col className="gutter-row" style={{fontSize: "large"}}>
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
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    placeholder="input here"
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 8 }} > 
                <Col className="gutter-row" >
                    <div className="gx-mr-3">
                        <img width="400px" height="300" src={`images/tramthuydien${curStationData.id+1}.png`} alt='flying'/>
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                    {curStationData['name']} + Tram khong biet ten
                </Col>
            </Row>
        </>
    );
    
}

export default InformationCard;
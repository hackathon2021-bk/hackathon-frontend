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

    console.log(curStationData['id']);
    const state = {
        dataSource: [],
    }

    const handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
            value,
            value + value,
            value + value + value,
            ],
        });
    }

    return (
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
                        <img src={"images/tramthuydien.png"} alt='flying'/>
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom: 8, justifyContent: "center"}}>
                <Col className="gutter-row" style={{fontSize: "large"}}>
                    {curStationData['name']}
                </Col>
            </Row>
        </>
    );
    
}

export default InformationCard;
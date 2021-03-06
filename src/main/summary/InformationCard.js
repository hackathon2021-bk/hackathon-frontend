import React, { Component } from "react";
import { AutoComplete, Card, Col, Row, Text } from "antd";
import { Table, Tag, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import data from "data/data";
import { Button } from "antd/lib/radio";

import Link from "next/link";
const InformationCard = () => {
    const getStationData = (data, stationId) => {
        // console.log('stationId :>> ', stationId);
        let dtPoint = data['data'][stationId - 1];
        // console.log('dtPoint :>> ', dtPoint);
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
    // lay station mac dinh 
    const stationId = useSelector((state) => state.map.stationId);

    const curStationData = getStationData(data, stationId);
    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '',
            dataIndex: 'number',
            key: 'age',
        },
        {
            title: '',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'dangerous') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    const stationData = [
        {
            key: '1',
            name: 'Nhi???t ?????:',
            number: curStationData['temperature'],
            tags: ['normal'],
        },
        {
            key: '2',
            name: 'M???c n?????c:',
            number: curStationData['water_level'],
            tags: ['dangerous'],
        },
        {
            key: '3',
            name: 'L??u l?????ng:',
            number: curStationData['discharge'],

            tags: ['nice'],
        },
        {
            key: '4',
            name: 'L?????ng m??a:',
            number: curStationData['rainfall'],

            tags: ['nice'],
        },
        {
            key: '5',
            name: '????? ???m:',
            number: curStationData['humidity'],

            tags: ['normal'],
        },
        {
            key: '5',
            name: 'Bay h??i:',
            number: curStationData['evaporation'],

            tags: ['normal'],
        },
    ];
    // console.log(`curStationData.known :>> images/tramthuydien${curStationData.id}.png`);
    return (
        <>
            {/* <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    Nhi???t ?????:
                </Col>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    {curStationData['temperature']}
                </Col>
            </Row>

            <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    M???c n?????c:
                </Col>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    {curStationData['water_level']}
                </Col>
            </Row>

            <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    L??u l?????ng:
                </Col>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    {curStationData['discharge']}
                </Col>
            </Row>

            <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    L?????ng m??a:
                </Col>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    {curStationData['rainfall']}
                </Col>
            </Row>

            <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    ????? ???m:
                </Col>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    {curStationData['humidity']}
                </Col>
            </Row>

            <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    Bay h??i:
                </Col>
                <Col span={8} className="gutter-row" style={{ fontSize: "large" }}>
                    {curStationData['evaporation']}
                </Col>
            </Row>
       
        */}
            <Table columns={columns} dataSource={stationData} pagination={false} showHeader={false} />
        </>
    );

}

export default InformationCard;
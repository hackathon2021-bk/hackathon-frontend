import React, { Component } from "react";
import { AutoComplete, Card, Col, Row, Text } from "antd";
import { Table, Tag, Space } from 'antd';
import { MapActions } from 'app-redux/map';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd/lib/radio";
import Link from "next/link";
const InformationCard = (props) => {
    const dispatch = useDispatch();
    const data = props.props.data;
    // console.log('data check info card:>> ', data);
    const curStationData = props.props.curStationData;
    const lstSubscribedStationId = props.props.lstSubscribedStationId;
    const stationId = props.props.stationId;

    const onUpdateStationData = (newStationData) => {
        dispatch(MapActions.updateStationData(newStationData));
    };

    const onUpdateSubscribedStationData = (newStationLst) => {
        dispatch(MapActions.updateSubscribedStationId(newStationLst));
    }

    const getUpdatedData = (data, stationId) => {
        data[stationId - 1]['known'] = 1;
        return data;
    }

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

    const handleButtonClick = () => {
        if (lstSubscribedStationId.indexOf(stationId) == -1) { // n eu tram chua dc subsribe
            let newStationLst = lstSubscribedStationId.concat(stationId);
            let newData = getUpdatedData(data, stationId);
            onUpdateStationData(newData);
            onUpdateSubscribedStationData(newStationLst);
        }
    };
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
            name: 'Nhiệt độ:',
            number: curStationData['temperature'],
            tags: ['normal'],
        },
        {
            key: '2',
            name: 'Mực nước:',
            number: curStationData['water_level'],
            tags: ['dangerous'],
        },
        {
            key: '3',
            name: 'Lưu lượng:',
            number: curStationData['discharge'],

            tags: ['nice'],
        },
        {
            key: '4',
            name: 'Lượng mưa:',
            number: curStationData['rainfall'],

            tags: ['nice'],
        },
        {
            key: '5',
            name: 'Độ ẩm:',
            number: curStationData['humidity'],

            tags: ['normal'],
        },
        {
            key: '5',
            name: 'Bay hơi:',
            number: curStationData['evaporation'],

            tags: ['normal'],
        },
    ];
    // console.log(curStationData);

    // console.log(`curStationData.known :>> images/tramthuydien${curStationData.id}.png`);
    return (
        curStationData.known === 1 ?
            <>
                <Row style={{ marginBottom: 8 }} >
                    <Col className="gutter-row" span={8}>
                        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                            Tìm trạm
                        </div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <AutoComplete
                            dataSource={state.dataSource}
                            style={{ width: '100%' }}
                            onSearch={handleSearch}
                            placeholder="input here"
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 8 }} >
                    <Col className="gutter-row" >
                        <div className="gx-mr-3">
                            <img width="400px" height="300px" src={`images/tramthuydien${curStationData.id}.png`} alt='flying' />
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                    <Col className="gutter-row" style={{ fontSize: "25px", margin: '10px 10px', textAlign: 'center' }}>
                        <b>{curStationData['name']}</b>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={stationData} pagination={false} showHeader={false} />
            </> :
            <>
                <Row style={{ marginBottom: 8, alignItems: 'center' }} >
                    <Col className="gutter-row" span={8}>
                        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                            Tìm trạm
                        </div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <AutoComplete
                            dataSource={state.dataSource}
                            style={{ width: '100% !important' }}
                            // onSelect={onSelect}
                            onSearch={handleSearch}
                            placeholder="input here"
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 8 }} >
                    <Col className="gutter-row" >
                        <div className="gx-mr-3">
                            <img width="400px" height="300" src={`images/tramthuydien${curStationData.id}.png`} alt='flying' />
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                    <Col className="gutter-row" style={{ fontSize: "25px" }}>
                        <b>{curStationData['name']}</b>
                    </Col>
                </Row>

                <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                    <Col className="gutter-row" style={{ fontSize: "large" }}>
                        Bạn chưa đăng ký nhận dữ liệu của trạm này
                    </Col>
                </Row>

                <Row style={{ marginBottom: 8, justifyContent: "center" }}>
                    <Link href='/map/register'><Button className="gx-mb-0" type="primary">Đăng ký</Button></Link>
                </Row>
            </>
    );

}

export default InformationCard;
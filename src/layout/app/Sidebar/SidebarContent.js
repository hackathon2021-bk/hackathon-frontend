import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { InitActions } from "/app-redux/init";
import data from "data/data";
import AppLink from "components/AppLink";

import { SettingActions } from "app-redux/settings";
import { MapActions } from "app-redux/map";

import { Button, Card, Dropdown, Menu, message } from "antd";
import { DownOutlined } from '@ant-design/icons';
import SidebarLogo from "./SidebarLogo";


function SidebarContent() {
  const dispatch = useDispatch();
  const trick = [];
  useEffect(() => {
    let markers = data['data'].map(
      (dtPoint, index) => ({
        id: index,
        position: { lat: dtPoint.latitude, lon: dtPoint.longitude },
        name: dtPoint['name']
      }));

    dispatch(InitActions.setStations(markers));
  }, trick);


  const listSubscribedStations = useSelector((state) => state.map.lstSubscribedStationId);
  const listStations = useSelector((state) => state.init.stationsList);
  const router = useRouter();
  const pathname = useSelector((state) => state.settings.pathname);
  const user = useSelector((state) => state.auth.user);

  let menu = (
    <Menu onClick={(e) => {
      dispatch(InitActions.setStationId(parseInt(e.key)));
      dispatch(MapActions.updateStationId(parseInt(e.key)))
    }
    }>
      {
        listStations.map(station => {
          // neu ton tai tram trong danh sach subscribed thi moi hien Menu Item
          if (listSubscribedStations.includes(station['id'])) {
            return (
              <Menu.Item key={station['id']}>{station['name']}</Menu.Item>
            )
          }
        })
      }
    </Menu>
  )
  useEffect(() => {
    dispatch(SettingActions.setPathname(router.pathname));
  }, [router.pathname, dispatch]);
  const buff = pathname.split('/');
  const currentSelected = buff[buff.length - 1];
  // console.log(buff[buff.length - 1]);
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content pagemenu">
        <Menu
          defaultOpenKeys={[defaultOpenKeys]}
          selectedKeys={[currentSelected]}
          theme="dark"
          mode="vertical"
        >
          <Menu.ItemGroup key="stations" className="gx-menu-group" title="Chọn trạm">
            <Menu.Item key="stations">
              <Dropdown overlay={menu}>
                <Button >
                  Stations <DownOutlined />
                </Button>
              </Dropdown>
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.ItemGroup key="applications" className="gx-menu-group" title="Chức năng">
            <Menu.Item key="summary">
              <AppLink href="/summary">
                <i className="icon icon-dasbhoard" style={{ color: 'white' }} />
                <span style={{ color: 'white' }}>Tổng hợp</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="analysis">
              <AppLink href="/summary/analysis">
                <i className="icon icon-data-display" style={{ color: 'white' }} />
                <span style={{ color: 'white' }}>Phân tích</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="historydata">
              <AppLink href="/summary/historydata">
                <i className="icon icon-table" style={{ color: 'white' }} />
                <span style={{ color: 'white' }}>Dữ liệu quá khứ</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="predict">
              <AppLink href="/summary/predict">
                <i className="icon icon-timeline" style={{ color: 'white' }} />
                <span style={{ color: 'white' }}>Dự đoán</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="settings">
              <AppLink href="/summary/settings">
                <i className="icon icon-timeline-new" style={{ color: 'white' }} />
                <span style={{ color: 'white' }}>Cài đặt</span>
              </AppLink>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </div>
    </>
  );
}

export default SidebarContent;
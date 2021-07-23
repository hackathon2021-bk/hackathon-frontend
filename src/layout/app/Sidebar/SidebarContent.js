import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import AppLink from "components/AppLink";

import { SettingActions } from "app-redux/settings";

import {Button, Card, Dropdown, Menu, message} from "antd";
import {DownOutlined} from '@ant-design/icons';
import SidebarLogo from "./SidebarLogo";
import data from "data/data";
import { MapActions } from "app-redux/map";


function SidebarContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = useSelector((state) => state.settings.pathname);
  const user = useSelector((state) => state.auth.user);
  const stationId = useSelector((state) => state.map.stationId);
 
  const onSetStationId = (stationId) => {
    dispatch(MapActions.updateStationId(stationId));
  };

  const handleMenuClick = ((key) => {
    // console.log('key :>> ', key);
    onSetStationId(key);
    console.log('global station id :>> ', stationId);
  });

  const getMenu = ((lstSubscribedStations) => {
    return  (
      <Menu 
        selectedKeys={lstSubscribedStations.map( station => station.id)}
        onClick={(e) => handleMenuClick(e.key)}
      >
        {
          lstSubscribedStations.map((station) => (
            <Menu.Item key={station.id}  >{`${station.name}`} </Menu.Item> 
          ))
        }
      </Menu>
    );
  });

  const menu = getMenu(data['data']);

  useEffect(() => {
    dispatch(SettingActions.setPathname(router.pathname));
  }, [router.pathname, dispatch]);

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <>
      <SidebarLogo/>
      <div className="gx-layout-sider-header">
      </div>
      <div className="gx-sidebar-content">
        <Menu
          defaultOpenKeys={[defaultOpenKeys]}
          selectedKeys={[selectedKeys]}
          theme="dark"
          mode="inline"
        >
          <Menu.ItemGroup key="stations" className="gx-menu-group" title="Chọn trạm">
            <Menu.Item key="stations">
              <Dropdown overlay={menu}>
              <Button >
                Stations <DownOutlined/>
              </Button>
              </Dropdown>
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.ItemGroup key="applications" className="gx-menu-group" title="Chức năng">
            <Menu.Item key="summary">
              <AppLink href="/summary">
                <i className="icon icon-orders" />
                <span>Tổng hợp</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="analysis">
              <AppLink href="/analysis">
                <i className="icon icon-geo-location" />
                <span>Phân tích</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="history-data">
              <AppLink href="/historydata">
                <i className="icon icon-geo-location" />
                <span>Dữ liệu quá khứ</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="predict">
              <AppLink href="/predict">
                <i className="icon icon-geo-location" />
                <span>Dự đoán</span>
              </AppLink>
            </Menu.Item>

            <Menu.Item key="settings">
              <AppLink href="/settings">
                <i className="icon icon-geo-location" />
                <span>Cài đặt</span>
              </AppLink>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </div>
    </>
  );
}

export default SidebarContent;
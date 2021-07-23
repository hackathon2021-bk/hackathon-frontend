import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import AppLink from "components/AppLink";

import { SettingActions } from "app-redux/settings";

import {Button, Card, Dropdown, Menu, message} from "antd";
import {DownOutlined} from '@ant-design/icons';



function handleMenuClick(e) {
  message.info('Click on menu item.', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);


function SidebarContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = useSelector((state) => state.settings.pathname);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(SettingActions.setPathname(router.pathname));
  }, [router.pathname, dispatch]);

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <>
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
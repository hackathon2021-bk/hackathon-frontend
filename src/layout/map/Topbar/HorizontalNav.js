import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";

import AppLink from "components/AppLink";
function HorizontalNav() {
  const pathname = useSelector((state) => state.settings.pathname);

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal"
    >
      {/* <Menu.SubMenu
        popupClassName="gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve"
        key="apps"
        title="Apps"
      > */}
      <Menu.Item key="summary">
        <AppLink href="/summary">
          <i className="icon icon-search-new" />
          <span>Quản Lý Trạm</span>
        </AppLink>
      </Menu.Item>
      <Menu.Item key="map">
        <AppLink href="/map">
          <i className="icon icon-orders" />
          <span>Bản Đồ</span>
        </AppLink>
      </Menu.Item>
    </Menu>
  );
}

export default HorizontalNav;

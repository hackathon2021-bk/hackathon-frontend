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
      <Menu.Item key="explore">
        <AppLink href="/explore">
          <i className="icon icon-all-contacts" />
          <span>Quản Lý Trạm</span>
        </AppLink>
      </Menu.Item>
      <Menu.Item key="competitor-products">
        <AppLink href="/competitor-products">
          <i className="icon icon-navigation" />
          <span>Bản Đồ</span>
        </AppLink>
      </Menu.Item>
    </Menu>
  );
}

export default HorizontalNav;

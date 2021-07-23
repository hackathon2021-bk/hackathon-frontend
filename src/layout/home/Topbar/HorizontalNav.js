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
      <Menu.Item key="summary">
          <i className="icon icon-search-new" />
          <span>Mô hình giải pháp</span>
      </Menu.Item>
      <Menu.Item key="map">
          <i className="icon icon-orders" />
          <span>Lợi ích giải pháp</span>
      </Menu.Item>
      <Menu.Item key="signin">
        <AppLink href="/signin">
          <i className="icon icon-orders" />
          <span>Sign In</span>
        </AppLink>
      </Menu.Item>
    </Menu>
  );
}

export default HorizontalNav;

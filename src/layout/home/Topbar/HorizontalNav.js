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
          <span><a href="#mohinh">Mô hình giải pháp</a></span>
      </Menu.Item>
      <Menu.Item key="map">
          <i className="icon icon-orders" />
          <span><a href="#loiich">Lợi ích của giải pháp</a></span>
      </Menu.Item>
      <Menu.Item key="map">
          <i className="icon icon-phone" />
          <span><a href="#lienhe">Liên hệ với chúng tôi</a></span>
      </Menu.Item>

      <Menu.Item key="signin">
        <AppLink href="/signin">
          <i className="icon icon-signin" />
          <span>Đăng Nhập/Đăng ký</span>
        </AppLink>
      </Menu.Item>
    </Menu>
  );
}

export default HorizontalNav;

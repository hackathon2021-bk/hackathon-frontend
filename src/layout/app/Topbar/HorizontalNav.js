import React, { useState } from "react";
import { Menu } from "antd";
import { Alert } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import AppLink from "components/AppLink";
import { SettingActions } from "app-redux/settings";
const HorizontalNav = () => {
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState('summary');
  const pathname = useSelector((state) => state.settings.pathname).split('/')[1];
  // alert(pathname);
  // console.log(pathname);
  const onUpdatePath = (newPath) => {
    dispatch(SettingActions.setPathname(newPath))
  }

  return (
    <>
      <Menu
        defaultOpenKeys={['summary']}
        selectedKeys={[pathname]}
        onClick={(e) => {
          if (e.key.length <= 1) {
            setSelectedKey('summary');
            onUpdatePath('/summary');
          }
          else {
            setSelectedKey(e.key);
            onUpdatePath(`/${e.key}`);
          }
        }}
        mode="horizontal"
      >
        <Menu.Item key="summary">
          <AppLink href="/summary">
            <i className="icon icon-all-contacts" />
            <span>Quản Lý Trạm</span>
          </AppLink>
        </Menu.Item>
        <Menu.Item key="map">
          <AppLink href="/map">
            <i className="icon icon-navigation" />
            <span>Bản Đồ</span>
          </AppLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default HorizontalNav;

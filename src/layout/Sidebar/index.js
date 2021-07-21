import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Drawer, Layout } from "antd";

import SidebarContent from "layout/Sidebar/SidebarContent";
import { SettingActions } from "app-redux/settings";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "constants/ThemeSetting";


const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const navCollapsed = useSelector((state) => state.settings.navCollapsed);
  const width = useSelector((state) => state.settings.width);
  const pathname = useSelector((state) => state.settings.pathname);
  const navStyle = useSelector((state) => state.settings.navStyle);

  const onToggleCollapsedNav = () => {
    dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
  };

  useEffect(() => {
    const onResize = () => {
      dispatch(SettingActions.updateWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (router.pathname === pathname) {
      dispatch(SettingActions.toggleCollapsedSideNav(false));
    }
  }, [pathname, dispatch, router.pathname]);

  let drawerStyle = "gx-custom-sidebar";

  if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
    drawerStyle = "";
  } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
    drawerStyle = "gx-mini-sidebar gx-mini-custom-sidebar";
  } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
    drawerStyle = "gx-custom-sidebar"
  } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
    drawerStyle = "gx-mini-sidebar";
  } else if (navStyle === NAV_STYLE_DRAWER) {
    drawerStyle = "gx-collapsed-sidebar"
  }
  if ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR
    || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) && width < TAB_SIZE) {
    drawerStyle = "gx-collapsed-sidebar"
  }
  console.log(`${drawerStyle}`);
  return (
    <Layout.Sider
      className={`gx-app-sidebar ${drawerStyle}  gx-layout-sider-dark`}
      trigger={null}
      collapsed={(width < TAB_SIZE ? false : navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
      theme="dark"
      collapsible
    >
      {
        navStyle === NAV_STYLE_DRAWER || width < TAB_SIZE ?
        <Drawer
          className="gx-drawer-sidebar gx-drawer-sidebar-dark"
          placement="left"
          closable={false}
          onClose={onToggleCollapsedNav}
          visible={navCollapsed}>
          <SidebarContent />
        </Drawer> : 
        <SidebarContent />
      }
    </Layout.Sider>
  );
};

export default Sidebar;
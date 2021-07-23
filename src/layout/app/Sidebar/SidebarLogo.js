import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";

import { SettingActions } from "app-redux/settings";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "constants/ThemeSetting";


const SidebarLogo = () => {
  const dispatch = useDispatch();
  // const {width, themeType, navCollapsed} = useSelector(({settings}) => settings);
  let navStyle = useSelector(({settings}) => settings.navStyle);
  const navCollapsed = useSelector((state) => state.settings.navCollapsed);
  const width = useSelector((state) => state.settings.width);
  const themeType = useSelector((state) => state.settings.themeType);

  if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
    navStyle = NAV_STYLE_DRAWER;
  }

  console.log(`current navStyle: ${navStyle}`);
  console.log(`current navCollapsed: ${navCollapsed}`);
  return (
    <div className="gx-layout-sider-header">
      {
      (navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) ? 
        <div className="gx-linebar">
          <i
            className={`gx-icon-btn icon icon-${navStyle === NAV_STYLE_MINI_SIDEBAR ? 'menu-unfold' : 'menu-fold'} ${themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''}`}
            onClick={() => {
              if (navStyle === NAV_STYLE_DRAWER) {
                dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
              } else if (navStyle === NAV_STYLE_FIXED) {
                dispatch(SettingActions.onNavStyleChange(NAV_STYLE_MINI_SIDEBAR))
              } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
                dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
              } else {
                dispatch(SettingActions.onNavStyleChange(NAV_STYLE_FIXED))
              }
            }}
          />
        </div> : 
      null
      }

      {/* <Link href="/" >
        <a className="gx-site-logo">
        {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ?
          <img alt="lo" src={("/images/w-logo.png")}/> :
          themeType === THEME_TYPE_LITE ?
            <img alt="logo1" src={("/images/logo-white.png")}/> :
            <img alt="logo2" src={("/images/logo.png")}/>}
        </a>
      </Link> */}
    </div>
  );
};

export default SidebarLogo;

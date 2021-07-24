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

  // console.log(`current navStyle: ${navStyle}`);
  // console.log(`current navCollapsed: ${navCollapsed}`);
  return (
    <div className="gx-layout-sider-header" style={{height: '200px'}}>
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

      <Link href="/" >
        <a className="gx-site-logo gx-py-3">
        {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ?
          <img alt="lo" src={("/images/w-logo.png")} className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
          src="/images/wave-logo.svg"
          width="100"
          height="100"/> :
          themeType === THEME_TYPE_LITE ?
            <img alt="logo1" src={("/images/wave-logo.svg")} className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
            src="/images/wave-logo.svg"
            width="100"
            height="100"/> :
            <img alt="logo2" src={("/images/wave-logo.svg")} 
            className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
            src="/images/wave-logo.svg"
            width="200"
            height="200"
            />}
        </a>
      </Link>
    </div>
  );
};

export default SidebarLogo;

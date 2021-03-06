import React from "react";
import { Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "app-redux/auth";

import AppLink from "components/AppLink";

function UserInfo() {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.auth.user.avatar);
  const username = useSelector((state) => state.auth.user.username);

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>
        <AppLink href="/my-account">My Account</AppLink>
      </li>
      <li onClick={() => dispatch(AuthActions.logout())}>Logout</li>
    </ul>
  );

  return (
    <div className="d-flex" style={{ display: 'contents', color: 'white' }}>
      Hi, {username || 'Thuy Dung'}
      <li className="gx-user-nav" style={{ margin: '0px 10px' }}>

        <Popover
          overlayClassName="gx-popover-horizantal"
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          <Avatar
            src="https://via.placeholder.com/150"
            className="gx-avatar gx-pointer"
            alt=""
          />
        </Popover>
      </li>
    </div>
  );
}

export default UserInfo;

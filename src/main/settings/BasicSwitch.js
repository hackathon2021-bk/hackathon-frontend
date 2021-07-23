import React from "react";
import {Switch} from "antd";

const BasicSwitch = () => {
  function onChange(checked) {
  }

  return (
        <Switch defaultChecked onChange={onChange}/>
  );
};

export default BasicSwitch;

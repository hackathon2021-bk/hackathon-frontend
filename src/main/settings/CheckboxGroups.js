import React from "react";
import {Card, Checkbox} from "antd";

const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
}

const plainOptions = ['Hàng ngày', 'Hàng tuần', 'Khi chạm ngưỡng'];

const CheckboxGroups = () => {
    return (
          <div>
            <Checkbox onChange={onChange}>Hàng ngày</Checkbox>
            <br/>
            <br/>
            <Checkbox onChange={onChange}>Hàng tuần</Checkbox>
            <br/>
            <br/>
            <Checkbox onChange={onChange}>Khi chạm ngưỡng</Checkbox>
          </div>
      
    );
  }
;

export default CheckboxGroups;

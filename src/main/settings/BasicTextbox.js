import React from "react";
import {Input} from "antd";

const BasicTextbox = (props) => {
  const handleInputChange = (e) => {
    console.log(e.target.value);
    props.inputChange(e.target.value);
  }
  return (
      <Input placeholder="abc@gmail.com" onChange={handleInputChange} type='email'/>
  );
};

export default BasicTextbox;

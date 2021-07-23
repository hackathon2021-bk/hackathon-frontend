import React from "react";
import {Button, Card, message} from "antd";

const info = () => {
  message.info('Cảnh báo sẽ được gửi tới bạn');
};

const Basic = () => {
  return (
      <Button type="primary" onClick={info}>Lưu</Button>
  );
};

export default Basic;

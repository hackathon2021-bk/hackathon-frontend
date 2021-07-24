import React from "react";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AuthActions } from "app-redux/auth";

const LogInWrapper = styled.div`
background: url('/images/bg.png');
height: 100%;
`;

const LogInLayerWrapper = styled.div`
background-color: rgba(3, 37, 108, 0.5);
height: 100%;
`;

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function onFinish(values) {
    dispatch(AuthActions.login(values));
  }

  return (
    <LogInWrapper>
      <LogInLayerWrapper>
        <div className="gx-app-login-wrap">
          <div className="gx-app-login-container">
            <h1 style={{ color: 'white' }}>WELCOME TO QH-TEAM PLATFORM</h1>

            <LogInWrapper>
              <div className="gx-app-login-main-content">
                <div className="gx-app-logo-content">
                  <div className="gx-app-logo-content-bg">
                    {/* <img src="/images/appModule/neature.jpg" alt="Neature" /> */}
                  </div>
                  <div className="gx-app-logo-wid">
                    <h1>Đăng nhập</h1>
                    <h3>Cập nhật thông tin nhanh chóng, chính xác</h3>
                    <h3>Phân tích, dự đoán ứng dụng Trí tuệ nhân tạo </h3>
                  </div>
                  <div className="gx-app-logo">
                    <img alt="example" src={"/images/logo.png"} />
                  </div>
                </div>
                <div className="gx-app-login-content">
                  <Form
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={onFinish}
                    className="gx-signin-form gx-form-row0"
                  >
                    <Form.Item
                      initialValue="demo1@gmail.com"
                      rules={[
                        { type: "email", message: "Email không hợp lệ" },
                        { required: true, message: "Email không hợp lệ" },
                      ]}
                      name="email"
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                      initialValue="aaa123"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                      ]}
                      name="password"
                    >
                      <Input type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        loading={loading}
                        type="primary"
                        className="gx-mb-0"
                        htmlType="submit"
                        children="Đăng nhập"
                      />
                      <div style={{ marginTop: '10px' }}>Bạn chưa có tài khoản? <Link href="/signup">
                        <a style={{ color: '#03256C', fontSize: '18px' }}>Đăng ký</a>
                      </Link> </div>

                    </Form.Item>
                  </Form>
                </div>
              </div>
            </LogInWrapper>
          </div>
        </div>
      </LogInLayerWrapper>
    </LogInWrapper>
  );
}

export default SignIn;

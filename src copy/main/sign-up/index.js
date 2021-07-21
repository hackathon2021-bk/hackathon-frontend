import React from "react";
import Link from "next/link";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { AuthActions } from "app-redux/auth";

function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function onFinish(values) {
    dispatch(AuthActions.register(values));
  }

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src="/images/appModule/neature.jpg" alt="Neature" />
            </div>
            <div className="gx-app-logo-wid">
              <h1>Sign In</h1>
              <p>By Signing Up, you can avail full features of our services</p>
              <p>Get an account !!!</p>
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
                placeholder="Username"
                rules={[{ required: true, message: "username is required!" }]}
                name="username"
                children={<Input placeholder="Username" />}
              />
              <Form.Item
                initialValue="demo@example.com"
                rules={[
                  { type: "email", message: "The input is not valid E-mail!" },
                  { required: true, message: "Email is required!" },
                ]}
                name="email"
                children={<Input placeholder="Email" />}
              />
              <Form.Item name="role">
                <Select placeholder="Role">
                  <Select.Option value="user">User</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                name="password"
                children={<Input type="password" placeholder="Password" />}
              />
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm Password!",
                  },
                ]}
                name="confirmPassword"
                children={
                  <Input type="password" placeholder="Confirm Password" />
                }
              />

              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  className="gx-mb-0"
                  htmlType="submit"
                  children="Sign Up"
                />
                <span>or </span>
                <Link href="/signin">
                  <a>Sign In</a>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

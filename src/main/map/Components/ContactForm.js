import React, { useState, useEffect } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import { useRouter } from 'next/router';
const { Option } = Select;

const residences = [
  {
    value: 'hn',
    label: 'Hà Nội',
    children: [
      {
        value: 'hbt',
        label: 'Quận Hai Bà Trưng',
        children: [
          {
            value: 'kn',
            label: 'Kim Ngưu',
          },
        ],
      },
      {
        value: 'qo',
        label: 'Quận Hoàn Kiếm',
        children: [
          {
            value: 'kn',
            label: 'Hoàn Kiếm',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    // xs: {
    //   span: 24,
    //   offset: 0,
    // },
    // sm: {
    //   span: 25,
    //   offset: 0,
    // },
    // lg: {
    //   span: 30,
    //   offset: 0,
    // }
  },
};

export const RegistrationForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const alertMes = () => {
    message.error('Chúng tôi sẽ phản hồi lại bạn sớm nhất ngay khi có được phản hồi từ đối tác quản lí trạm quan trắc này.');
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      style={{ width: '80%' }}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['Hà Nội'],
        prefix: '86',
      }}
      scrollToFirstError
    >

      {/* <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập password',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item> */}
      {/* 
      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}
      <Form.Item
        name="nickname"
        label="Họ và tên"
        tooltip="Bạn cần nhập họ tên có dấu bằng tiếng việt"
        rules={[{ required: true, message: 'Bạn cần nhập họ tên có dấu bằng tiếng việt!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Giới tính"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder="Chọn giới tính">
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Email không hợp lệ',
          },
          {
            required: true,
            message: 'Vui lòng nhập email',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="residence"
        label="Nơi sống"
        rules={[
          { type: 'array', required: true, message: 'Please select your habitual residence!' },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="company"
        label="Tố chức, công ty, ..."
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="purpose"
        label="Lý do muốn theo dõi trạm"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[{ required: false, message: 'Please input website!' }]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item>
      <Row style={{justifyContent: 'center'}}>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Tôi muốn nhận dữ liệu từ trạm và <a href="">đồng ý </a> với điều khoản của QH.
          </Checkbox>
        </Form.Item>
      </Row>
      <Row style={{justifyContent: 'center'}}>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit"
            onClick={() => {
              // alert(alertMes("Chúng tôi sẽ phản hồi lại bạn sớm nhất ngay khi có được phản hồi từ đối tác quản lí trạm quan trắc này."));
              alertMes();
              setTimeout(function () { router.push('/summary'); }, 3000);
            }}>
            Đăng ký theo dõi trạm
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

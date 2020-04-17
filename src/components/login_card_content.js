import React, { useEffect, useState, useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useForm from '../hooks/useForm';
import { postData } from '../components/HttpController';
import { AppContext } from '../contexts/AppContext';

function LoginCardContent({ onSuccess }) {
  const appContext = useContext(AppContext)
  //const initialValues = {email:'', password:''}
  //const { values, handleChange, handleSubmit } = useForm(initialValues, login);


  // Post email and password to backend for authentication
  function login(values) {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/user/authenticate`;
    postData(endpoint, values, (res) => {
      console.log(values)
      if (res.status === 200) {
        console.log('Logged in')
        appContext.setAuth()
        onSuccess()
      } else { // If authentication fails
        const error = new Error(res.error);
        throw error;
      }
    });
  }

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          email: '',
          password: ''
        }}
        onFinish={login}
        style={{ maxWidth: "300px" }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email@email.com" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="" style={{ float: "right" }}>
            Forgot password
        </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
            Log in
        </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );

}

export default LoginCardContent;

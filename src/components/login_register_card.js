import React, { useEffect, useState, useContext } from 'react';
import useForm from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';

import LoginCardContent from '../components/login_card_content'
import RegisterCardContent from '../components/register_card_content'

// Ant Design Card holding login and registration forms
// onSuccess callback is called if login or registration is successful
function LoginRegisterCard ({onSuccess}) {
  const [ key , setKey ] = useState('Login')

  const tabList = [
    {
      key: 'Login',
      tab: 'Login'
    },
    {
      key: 'Register',
      tab: 'Register'
    }
  ]

  const contentList = {
    Login: <LoginCardContent onSuccess={onSuccess}/>,
    Register: <RegisterCardContent onSuccess={onSuccess}/>
  }

  return (
    <Card
      style={{ width: '100%' }}
      tabList={tabList}
      activeTabKey={key}
      onTabChange={key => {
        setKey(key)
      }}
    >
      {contentList[key]}
    </Card>
  );
}

export default LoginRegisterCard
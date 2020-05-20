import React, { useContext, useState } from "react";

import { Modal } from "antd";

import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

import { AppContext } from "../contexts/AppContext";

import "./login_register_modal.css";

function LoginRegisterModal({ onSubmit }) {
  const appContext = useContext(AppContext);

  const handleOk = () => {
    console.log("modal ok");
  };

  const handleCancel = () => {
    console.log("modal cancel");
    appContext.setAuthModalVisible(false);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={appContext.authModalVisible}
      maskClosable={false}
      onCancel={handleCancel}
      footer={null}
      title=""
    >
      <AmplifyAuthenticator>
        <AmplifySignIn
          headerText="Create your account!"
          slot="sign-in"
        ></AmplifySignIn>
      </AmplifyAuthenticator>
    </Modal>
  );
}

export default LoginRegisterModal;

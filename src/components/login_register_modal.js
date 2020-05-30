import React, { useContext, useState } from "react";

import { Modal } from "antd";

import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
  AmplifyConfirmSignUp,
} from "@aws-amplify/ui-react";
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
    <div className="auth-modal">
      <Modal
        title="Basic Modal"
        visible={appContext.authModalVisible}
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
        title=""
      >
        <AmplifyAuthenticator usernameAlias="username">
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="username"
            formFields={[
              {
                type: "username",
                label: "Username",
                placerholder: "Enter your username",
                required: true,
              },
              {
                type: "email",
                label: "Email",
                placeholder: "Enter your email",
                required: true,
              },
              {
                type: "password",
                label: "Password",
                placeholder: "Enter your password",
                required: "true",
              },
            ]}
          />

          <AmplifyConfirmSignUp
            headerText="Please verify your email"
            slot="confirm-sign-in"
          />

          <AmplifySignIn
            headerText="Login to Get Started!"
            usernameAlias="username"
            slot="sign-in"
          />
        </AmplifyAuthenticator>
      </Modal>
    </div>
  );
}

export default LoginRegisterModal;

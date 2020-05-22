import React, { useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Card, Button } from "antd";

import LoginRegisterModal from "../components/login_register_modal";
import TopNavBar from "../components/top_nav_bar";
import { AppContext } from "../contexts/AppContext";
import { Auth } from "aws-amplify";

import "./StartPage.css";

function StartPage() {
  const appContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (appContext.isAuth) {
      history.push("/home");
    }
  }, [appContext.isAuth]);

  const navBarColor = "#ffffff";

  return (
    <div className="container">
      <TopNavBar type="main" backgroundColor={navBarColor} theme="light" />
      <div className="banner-container">
        <h1 className="heading">Learn Robotics in your Browser</h1>
        <h4 className="description">
          We provide an educational robotics environment in your browser where
          you can program your own autonomous robot.
        </h4>
        <Button
          onClick={() => {
            Auth.federatedSignIn();
          }}
          style={{
            width: "150px",
            height: "50px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#32CD32",
            marginTop: "20px",
            border: "0",
          }}
        >
          GET STARTED!
        </Button>
      </div>
      <LoginRegisterModal />
    </div>
  );
}

export default StartPage;

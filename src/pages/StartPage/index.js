import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import Fade from "react-reveal/Fade";

import LoginRegisterModal from "components/login_register_modal";
import TopNavBar from "components/top_nav_bar";
import { AppContext } from "contexts/AppContext";

import SplitContainer from "components/split_container";
import "./index.css";

import Footer from "components/footer";

function StartPage() {
  const appContext = useContext(AppContext);
  const [loginVisible, setLoginVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (appContext.isAuth) {
      history.push("/dashboard");
    }
  }, [appContext.isAuth, history]);

  const navBarColor = "#172437";

  return (
    <div className="start-page-container" data-cy="start-page">
      <TopNavBar type="main" backgroundColor={navBarColor} theme="dark" />
      <div className="banner-container">
        <div className="text-container">
          <h1 className="heading">Learn Robotics in your Browser</h1>
          <h4 className="description">
            We provide an educational robotics environment in the browser where
            you program your own autonomous robot to carry out challenging tasks
            and compete with other robots.
          </h4>
          <Fade>
            <Button
              onClick={() => {
                setLoginVisible(true);
              }}
              className="start-button"
            >
              Get Started!
            </Button>
          </Fade>
        </div>
      </div>
      <div className="text-container">
        <SplitContainer leftSize={9}>
          <div>
            <h2> Learn </h2>
            <p>
              {" "}
              Learn applied concepts and algorithms in Robotics in our hands-on
              educational tutorials.{" "}
            </p>
          </div>
          <div>
            <img src="/assets/tutorial_page.png" />
          </div>
        </SplitContainer>
      </div>

      <div className="alt-container-background">
        <div className="text-container">
          <SplitContainer leftSize={15}>
            <div>
              <img src="/assets/game_page.png" />
            </div>
            <div>
              <h2> Compete </h2>
              <p>
                Challenge yourself in our robotics competitions and see the
                results of your hardwork.
              </p>
            </div>
          </SplitContainer>
        </div>
      </div>

      <div className="text-container">
        <SplitContainer leftSize={9}>
          <div style={{ width: "100%" }}>
            <h2> Excited? </h2>
            <Fade>
              <Button
                onClick={() => {
                  setLoginVisible(true);
                }}
                className="start-button"
              >
                Get Started!
              </Button>
            </Fade>
          </div>
          <div>
            <img src="/assets/tutorial_page.png" />
          </div>
        </SplitContainer>
      </div>
      <Footer />
      <LoginRegisterModal
        visible={loginVisible}
        handleCancel={() => setLoginVisible(false)}
      />
    </div>
  );
}

export default StartPage;

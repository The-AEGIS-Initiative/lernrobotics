import React, { useRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { Card, Button } from "antd";

import LoginRegisterModal from "../components/login_register_modal";
import GamePage from "./GamePage";
import TopNavBar from "../components/top_nav_bar";
import LevelCard from "../components/level_card";

import { AppContext } from "../contexts/AppContext";
import { Auth } from "aws-amplify";

import "./HomePage.css";

import * as graphqlController from "../graphql/graphql-controller";

const { Meta } = Card;

function HomePage() {
  const appContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!appContext.isAuth) {
      history.push("/");
    }
  }, [appContext.isAuth]);

  const navBarColor = "#3a608d";

  return (
    <div className="home-page">
      <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
        <TopNavBar type="main" backgroundColor={navBarColor} theme="dark" />
        <nav>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "40px",
            }}
          >
            <h1 className="module-title">
              <b> Tutorial Module #1 - PID Controllers </b>
            </h1>
            <LevelCard
              title="Hello World"
              description="Get started with our Control Theory tutorial series!"
              link="/game/hello_world"
            />

            <LevelCard
              title="Data Abstraction"
              description="Learn about abstraction, a powerful engineering principle!"
              link="/game/data_abstraction"
            />

            <LevelCard
              title="Velocity Control"
              description="Learn how to implement a proportional feedback controller!"
              link="/game/velocity_control"
            />
          </ul>
        </nav>
        <LoginRegisterModal />
        {
          <Button
            onClick={async () => {
              var jsonObject = await graphqlController.createSubmission({
                level_name: "t2",
                score: "0",
                username: "kev",
              });
              console.log(jsonObject);
            }}
          >
            {" "}
            User{" "}
          </Button>
        }
      </div>
    </div>
  );
}

export default HomePage;

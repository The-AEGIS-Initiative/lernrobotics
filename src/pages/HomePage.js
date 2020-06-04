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
            <b> Getting Started </b>
          </h1>
          <LevelCard
            title="Hello World"
            description="Get started with Robobot!"
            link="/game/hello_world"
          />

          <LevelCard
            title="Movement"
            description="Learn how to control your robot's movement"
            link="/game/basic_movement"
          />

          <LevelCard
            title="Robot Data (Part I: Basics)"
            description="Learn how to access and utilize robot data"
            link="/game/robot_data"
          />

          <LevelCard
            title="Robot Data (Part II: Sensors)"
            description="Learn how to use robot sensors"
            link="/game/robot_sensors"
          />

          <h1 className="module-title" style={{ marginTop: "40px" }}>
            <b> Introduction to PID Controllers </b>
          </h1>
          <LevelCard
            title="Velocity Control"
            description="Learn how to implement a proportional (P) feedback controller!"
            link="/game/velocity_control"
          />
          <LevelCard
            title="Position Control"
            description="Learn how to implement a proportional-derivative (PD) feedback controller!"
            link="/game/position_control"
          />
          <LevelCard
            title="Advanced Position Control"
            description="Learn how to implement a proportional-integration-derivative (PID) controller!"
            link="/game/advanced_position_control"
          />
        </ul>
      </nav>
      <LoginRegisterModal />
      {
        <Button
          onClick={async () => {
            var jsonObject = await graphqlController.getDoc({
              doc_name: "test2",
            });
            console.log(jsonObject);
          }}
        >
          {" "}
          User{" "}
        </Button>
      }
    </div>
  );
}

export default HomePage;

import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { Card, Button } from "antd";

import GamePage from "./GamePage";
import TopNavBar from "../components/top_nav_bar";
import { AppContext } from "../contexts/AppContext";
import { Auth } from "aws-amplify";

import * as graphqlController from "../graphql/graphql-controller";

const { Meta } = Card;

function HomePage() {
  const appContext = useContext(AppContext);

  return (
    <div style={{ backgroundColor: "#b2c4d9", height: "100vh" }}>
      <TopNavBar type="main" />
      <nav>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "40px",
          }}
        >
          <h1>
            <b> Tutorial Module #1 - PID Controllers </b>
          </h1>
          <Card style={{ width: 600, margin: "30px" }}>
            <Meta
              title="Hello World"
              description="Get started with our Control Theory tutorial series!"
            />
            <Link to="/game/hello_world">Start!</Link>
          </Card>

          <Card
            title="Data Abstraction"
            description="Learn about abstraction, a powerful engineering principle!"
            style={{ width: 600, margin: "30px" }}
          >
            <Link to="/game/data_abstraction">Start!</Link>
          </Card>

          <Card
            title="Velocity Control"
            description="Learn how to implement a proportional feedback controller!"
            style={{ width: 600, margin: "30px" }}
          >
            <Link to="/game/velocity_control">Start!</Link>
          </Card>
        </ul>
      </nav>
      <Button
        onClick={async () => {
          var jsonObject = await graphqlController.getLevelAsGuest({
            level_name: "hello_world",
          });
          console.log(jsonObject);
        }}
      >
        {" "}
        User{" "}
      </Button>
    </div>
  );
}

export default HomePage;

import React, { useRef, useContext, useEffect, useState } from "react";
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
  const [contentSchema, setContentSchema] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!appContext.isAuth) {
      history.push("/");
    }

    // Content schema defines the organization of levels
    const fetchData = async () => {
      const contentData = await graphqlController.getDoc({
        doc_name: "ContentSchema",
      });

      if (contentData.length > 0) {
        setContentSchema(JSON.parse(contentData[0].doc_content));
      }
    };

    // Fetch Content Data
    fetchData();
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
          {contentSchema.modules &&
            contentSchema.modules.map((module) => {
              console.log(contentSchema);
              return (
                <div className="module">
                  <h1 className="module-title" key={module.name}>
                    {" "}
                    {module.name}{" "}
                  </h1>
                  {module.levels.map((level) => {
                    return (
                      <LevelCard
                        key={level.level_name}
                        title={level.title}
                        description={level.description}
                        link={`/game/${level.level_name}`}
                      />
                    );
                  })}
                </div>
              );
            })}
        </ul>
      </nav>
      <LoginRegisterModal />
      {process.env.NODE_ENV == "development" && (
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
      )}
    </div>
  );
}

export default HomePage;

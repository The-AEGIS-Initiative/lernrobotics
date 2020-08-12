import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Card, Button } from "antd";

import LoginRegisterModal from "components/login_register_modal";
import TopNavBar from "components/top_nav_bar";
import LevelCard from "components/level_card";
import Footer from "components/footer";

import { AppContext } from "contexts/AppContext";

import "./index.css";

import * as graphqlController from "graphql/graphql-controller";

const { Meta } = Card;

function PracticePage() {
  const appContext = useContext(AppContext);
  const [contentSchema, setContentSchema] = useState({});
  const [progress, setProgress] = useState([]);
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

      const progressList = await graphqlController.listProgress();
      setProgress(progressList);

      if (contentData.length > 0) {
        setContentSchema(JSON.parse(contentData[0].doc_content));
      }
    };

    // Fetch Content Data
    fetchData();
  }, [appContext.isAuth, history]);

  const navBarColor = "#172437";

  return (
    <div className="home-page" data-cy="practice-levels">
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
                    const levelProgress = progress.find(
                      (o) => o.level_name === level.level_name
                    );
                    let stars = 0;
                    if (levelProgress != null) {
                      stars = levelProgress.stars;
                    }

                    return (
                      <LevelCard
                        key={level.level_name}
                        title={level.title}
                        description={level.description}
                        link={`/game/${level.level_name}`}
                        difficulty={level.difficulty}
                        stars={stars}
                      />
                    );
                  })}
                </div>
              );
            })}
        </ul>
      </nav>
      <LoginRegisterModal />
      {process.env.NODE_ENV === "development" && (
        <Button
          onClick={async () => {
            const jsonObject = await graphqlController.getDoc({
              doc_name: "test2",
            });
            console.log(jsonObject);
          }}
        >
          {" "}
          User{" "}
        </Button>
      )}
      <Footer />
    </div>
  );
}

export default PracticePage;

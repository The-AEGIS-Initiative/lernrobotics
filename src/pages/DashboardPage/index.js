import React, { useEffect, useContext } from "react";
import { Row, Col, Space } from "antd";
import { useHistory } from "react-router-dom";

import DashboardButton from "components/dashboard_button";
import TopNavBar from "components/top_nav_bar";
import { AppContext } from "contexts/AppContext";

import * as graphqlController from "graphql/graphql-controller";

import "./index.css";

function DashboardPage() {
  const appContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!appContext.isAuth) {
      history.push("/");
    }
  }, [appContext.isAuth, history]);

  useEffect(() => {
    // Seed Mock Data
    if (
      process.env.NODE_ENV === "development" &&
      appContext.user_group === "admin"
    ) {
      const fetchData = async () => {
        const levelList = await graphqlController.listLevels();
        console.log(`levellist: ${levelList}`);

        if (levelList === "") {
          // Seed mock data if no existing data
          console.log("Empty level list, seeding mock data");
          fetch("mock_data/mock_practice_levels.json")
            .then((r) => r.json())
            .then(async (mockData) => {
              const levels = [];
              await mockData.map(async (levelData) => {
                await graphqlController.createLevel(levelData);
                await graphqlController.createPublishedLevel(levelData);
                const level = await graphqlController.getPublishedLevel({
                  level_name: levelData.level_name,
                });
                levels.push({
                  title: levelData.level_name,
                  description: "level description",
                  level_id: level[0].id,
                  level_name: levelData.level_name,
                  difficulty: "N/A",
                });
                if (levels.Length === mockData.Length) {
                  const contentSchema = {
                    modules: [{ name: "Mock Data", levels }],
                  };
                  console.log(JSON.stringify(contentSchema));
                  await graphqlController.createDoc({
                    doc_name: "ContentSchema",
                    doc_content: JSON.stringify(contentSchema),
                  });
                }
              });
            });
        }
      };
      fetchData();
    }
  });

  return (
    <div className="dashboard-page" data-cy="dashboard">
      <TopNavBar type="main" backgroundColor="#172437" theme="dark" />
      <div className="dashboard-container">
        <Space direction="vertical" size="middle">
          <Row>
            <Space direction="horizontal" size="middle">
              <Col span={12}>
                <DashboardButton
                  width="400px"
                  height="200px"
                  content="Practice"
                  link="/practice"
                />
              </Col>

              <Col span={12}>
                <DashboardButton
                  width="400px"
                  height="200px"
                  content="Compete"
                  disabled
                />
              </Col>
            </Space>
          </Row>
          <Row>
            <Space direction="horizontal" size="middle">
              <Col span={8}>
                <DashboardButton
                  width="266px"
                  height="200px"
                  content="Leaderboards"
                  disabled
                />
              </Col>

              <Col span={8}>
                <DashboardButton
                  width="252px"
                  height="200px"
                  content="Profile"
                  disabled
                />
              </Col>
              <Col span={8}>
                <DashboardButton
                  width="266px"
                  height="200px"
                  content="Settings"
                  disabled
                />
              </Col>
            </Space>
          </Row>
        </Space>
      </div>
    </div>
  );
}

export default DashboardPage;

import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Space } from "antd";
import { useHistory } from "react-router-dom";

import DashboardButton from "components/dashboard_button";
import TopNavBar from "components/top_nav_bar";
import { AppContext } from "contexts/AppContext";

import "./index.css";

function DashboardPage() {
  const appContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!appContext.isAuth) {
      history.push("/");
    }
  }, [appContext.isAuth]);

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
                  disabled={true}
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
                  disabled={true}
                />
              </Col>

              <Col span={8}>
                <DashboardButton
                  width="252px"
                  height="200px"
                  content="Profile"
                  disabled={true}
                />
              </Col>
              <Col span={8}>
                <DashboardButton
                  width="266px"
                  height="200px"
                  content="Settings"
                  disabled={true}
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

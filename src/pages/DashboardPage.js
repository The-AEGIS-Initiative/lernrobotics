import React, { useState, useEffect } from "react";
import DashboardButton from "../components/dashboard_button";
import { Row, Col, Space } from "antd";

import TopNavBar from "../components/top_nav_bar";

import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <TopNavBar type="main" backgroundColor="#3a608d" theme="dark" />
      <div className="dashboard-container">
        <Space direction="vertical" size="middle">
          <Row>
            <Space direction="horizontal" size="middle">
              <Col span={12}>
                <DashboardButton
                  width="400px"
                  height="200px"
                  content="Modules"
                  link="/home"
                />
              </Col>

              <Col span={12}>
                <DashboardButton
                  width="400px"
                  height="200px"
                  content="Competitions"
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
                  content="Leaderboard"
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

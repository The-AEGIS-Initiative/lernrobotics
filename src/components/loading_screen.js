import React from "react";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function LoadingScreen() {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 34, color: "white" }} spin />
  );

  return (
    <div
      style={{
        backgroundColor: "#333333",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: "0px",
      }}
    >
      <Spin indicator={antIcon} />
      <h1
        style={{
          color: "white",
          fontSize: "16px",
          fontFamily: "Montserrat",
          marginTop: "14px",
        }}
      >
        Loading Level...
      </h1>
    </div>
  );
}

export default LoadingScreen;

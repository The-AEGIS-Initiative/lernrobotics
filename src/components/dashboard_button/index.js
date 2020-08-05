import React, { Text, useState, useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import "./index.css";

export default function DashboardButton({
  width,
  height,
  content,
  link,
  disabled,
}) {
  return (
    <Link to={link}>
      <div className="dashboard-button" data-cy="dashboard-button">
        <Button
          className="raise"
          disabled={disabled}
          style={{
            width: width,
            height: height,
          }}
        >
          {content}
          <p className="coming-soon"> Coming Soon! </p>
        </Button>
      </div>
    </Link>
  );
}

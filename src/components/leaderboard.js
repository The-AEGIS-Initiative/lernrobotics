import React, { Text, useState, useEffect } from "react";
import { Table } from "antd";

import "./leaderboard.css";

function Leaderboard({ rankings }) {
  const columns = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => a.time - b.time,
      defaultSortOrder: "ascend",
      sortDirections: ["ascend"],
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <p>{text}</p>,
    },
  ];

  return (
    <div className="leaderboard">
      <Table columns={columns} dataSource={rankings} />
    </div>
  );
}

export default Leaderboard;

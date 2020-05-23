import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

import "./level_card.css";
import styles from "../style.module.css";

const { Meta } = Card;

function LevelCard({ title, description, link }) {
  return (
    <div className="level-card">
      <Card
        style={{
          width: "600px",
          height: "175px",
          margin: "30px",
          backgroundColor: "#214775",
        }}
      >
        <Meta title={title} description={description} />

        <Button className={`${styles.ui_font} button`}>
          <Link to={link}>Start</Link>
        </Button>
      </Card>
    </div>
  );
}

export default LevelCard;

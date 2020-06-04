import React, { Text, useState, useEffect } from "react";
import { Modal } from "antd";

import "./game_over_modal.css";

function GameOverModal({
  visible,
  isSuccess,
  message,
  handleOk,
  handleCancel,
}) {
  return (
    <div className="game-over-modal">
      <Modal
        className="game-over-modal"
        title={isSuccess ? "Success!" : "Try Again!"}
        visible={visible}
        footer={null}
        onOk={() => {
          handleOk();
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        {message.split(";").map((value, index) => {
          return <p>{value}</p>;
        })}
      </Modal>
    </div>
  );
}

export default GameOverModal;

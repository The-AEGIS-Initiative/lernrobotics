import React, { Text, useState, useEffect } from "react";
import { Modal } from "antd";

import "./game_modal.css";

function GameModal({ visible, title, message, handleOk, handleCancel }) {
  return (
    <div className="game-over-modal">
      <Modal
        className="game-over-modal"
        title={title}
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

export default GameModal;

import React from "react";
import { Modal } from "antd";

import "./index.css";

function GameModal({ visible, title, message, handleOk, handleCancel }) {
  return (
    <div className="game-over-modal" data-cy="game-modal">
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
        {message.split(";").map((value, index) => (
          <p>{value}</p>
        ))}
      </Modal>
    </div>
  );
}

export default GameModal;

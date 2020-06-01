import React, { Text, useState, useEffect } from "react";
import { Modal } from "antd";

import "./game_over_modal.css";

function GameOverModal({ visible, isSuccess, message }) {
  const [visibleState, setVisibleState] = useState(visible);

  useEffect(() => {
    setVisibleState(visible);
  }, [visible]);

  return (
    <div className="game-over-modal">
      <Modal
        className="game-over-modal"
        title={isSuccess ? "Success!" : "Try Again!"}
        visible={visibleState}
        footer={null}
        onOk={() => {
          setVisibleState(false);
        }}
        onCancel={() => {
          setVisibleState(false);
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

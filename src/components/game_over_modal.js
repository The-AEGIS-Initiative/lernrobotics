import React, { useState, useEffect } from "react";
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
        onOk={() => {
          setVisibleState(false);
        }}
        onCancel={() => {
          setVisibleState(false);
        }}
      >
        {message}
      </Modal>
    </div>
  );
}

export default GameOverModal;

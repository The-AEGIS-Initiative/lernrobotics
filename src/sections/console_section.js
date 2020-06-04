import React, { useEffect, useState, useContext, useRef } from "react";
import { Hook, Console, Decode } from "console-feed";
import { GamePageContext } from "../contexts/GamePageContext";
import { FixedSizeList } from "react-window";

import styles from "../style.module.css";

function ConsoleSection({ height, width }) {
  const gamePageContext = useContext(GamePageContext);

  const parent = useRef(null);

  function Row({ index, style }) {
    console.log(index);
    console.log(parent.current.offsetHeight);
    return <div> {gamePageContext.logs[index]} </div>;
  }

  return (
    <div style={{ height: `100%`, width: "100%" }} ref={parent}>
      <button
        style={{ position: "absolute", margin: 0, right: 0, zIndex: "1" }}
        className={`${styles.ui_font} ${styles.dark_buttons}`}
        onClick={() => gamePageContext.setLogs({ logs: [] })}
      >
        Clear
      </button>

      <div
        className="console"
        style={{
          height: `100%`,
          width: "100%",
          backgroundColor: "black",
        }}
      >
        {parent.current != null && (
          <FixedSizeList
            className="console-logs"
            height={parent.current.offsetHeight}
            itemCount={gamePageContext.logs.length}
            itemSize={25}
            width={parent.current.offsetWidth}
          >
            {Row}
          </FixedSizeList>
        )}
      </div>
    </div>
  );
}

// Filter logs so user is not floaded with useless information
const filter = (log) => {
  if (log == null) {
    return "";
  }
  // Remove line: "(Filename: ./Runtime/Export/Debug/Debug.bindings.h Line: 35)"
  var pattern = /\n\s\n*\(.*\)/;
  log = log.replace(pattern, "");

  // Remove "[UnityCache]" logs
  pattern = /\[UnityCache\].*/;
  log = log.replace(pattern, "");

  // Remove "WS error: WebSocket error"
  pattern = /WS error: WebSocket error/;
  log = log.replace(pattern, "");

  //Remove "Unloading ? unused Assets to reduce memory usage"
  pattern = /Unloading \d unused Assets to reduce memory usage/;
  log = log.replace(pattern, "");

  //Remove "Unloading ? Unused Serialized files (Serialized files now loaded: ?)"
  pattern = /Unloading \d Unused Serialized files \(Serialized files now loaded: \d\)/;
  log = log.replace(pattern, "");

  return log.trim();
};

export default ConsoleSection;

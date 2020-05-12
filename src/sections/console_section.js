import React, { useEffect, useState, useContext } from "react";
import { Hook, Console, Decode } from "console-feed";
import { GamePageContext } from "../contexts/GamePageContext";

function ConsoleSection({ height, width }) {
  const gamePageContext = useContext(GamePageContext);

  const [logs, setLogs] = useState([]);
  //console.log("isLoading: ", gamePageContext.isLoading)

  useEffect(() => {
    // Grabbing console logs from browser
    // Hook function to grab browser console logs
    Hook(
      window.console,
      (log) => {
        try {
          // Attempt to filter log
          log.data = [filter(log.data[0])];
        } catch (err) {
          // If error occurs for some reason, log
          // the original
          setLogs((logs) => [...logs, log]);
        }

        // If Unity game has finished loading and log is
        // non empty (due to filtering), add to logs
        if (log.data[0] != "" && !gamePageContext.isLoading) {
          setLogs((logs) => [...logs, log]);
        }
      },
      false // Some performance thing option from console-feed library
    );
  }, [gamePageContext.isLoading]); // Run when unity finishes loading

  return (
    <div style={{ height: `100%`, width: "100%" }}>
      <button style={{ color: "black" }} onClick={() => setLogs((logs) => [])}>
        Clear
      </button>
      <div
        className="console"
        style={{
          overflowY: "scroll",
          height: `100%`,
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <Console
          logs={logs}
          variant="dark"
          filter={["log", "error"]}
          style={{ height: "100%", width: `100%` }}
        />
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

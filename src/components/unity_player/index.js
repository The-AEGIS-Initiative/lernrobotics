import React, { useEffect, useContext, useState } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { GamePageContext } from "contexts/GamePageContext";

import { useWindowSize } from "hooks/useWindowSize";

import "./index.css";

function UnityPlayer({ unityContent, level_name, levelData, inFocus }) {
  const gamePageContext = useContext(GamePageContext);

  // The maximum width of unity without vertical overflow at 16:9 resolution
  // navbar is 45px tall
  // footer is 35px tall
  const maxWidth = Math.round(
    (useWindowSize().height - 45 - 35) * 1.77777777778
  );
  // console.log(maxWidth);
  useEffect(() => {
    // When unity webgl has loaded, send assigned port
    // to unity so that unity knows which websocket to connect
    // console.log(`levelData: ${levelData}`);
    unityContent.on("Loaded", () => {
      gamePageContext.setLoading(false);

      const game_server_url = sessionStorage.getItem("gameServerUrl");
      if (game_server_url != null) {
        if (game_server_url.match(/.*localhost.*/g)) {
          var url = `ws://${game_server_url}`;
        } else {
          var subdomain = game_server_url.match(/ec2-\d*-\d*-\d*-\d*/g);
          var port = game_server_url.match(/\d\d\d\d/g);
          var url = `wss://${subdomain}.aegisinitiative.io:${port}/websocket`;
        }

        console.log(url);
        // console.log(`levelData: ${levelData}`);

        if (level_name != "level_builder") {
          level_name = "blank_scene";
        }
        const dataPacket = `${url};${level_name};${levelData}`;

        // Send url to unity webgl
        // See the following for details:
        // https://github.com/elraccoone/react-unity-webgl/wiki/Communication-Guide

        unityContent.send("WebSocket Manager", "ConnectWS", dataPacket);

        console.log("Sent port to unity client");
      } else {
        console.log("Robobot back-end not running");
      }
      console.log("Game loaded"); // This log is used by cypress testing, update test if changed
    });
  }, []);

  useEffect(() => {
    if (!gamePageContext.isLoading) {
      setKeyboardInput();
    }
  }, [gamePageContext.isLoading, inFocus]);

  const setKeyboardInput = () => {
    console.log(`Unity capturing keyboard input: ${inFocus}`);
    if (inFocus) {
      // unityContent.send only allows sending strings
      unityContent.send("WebSocket Manager", "SetKeyboardInput", "true");
    } else {
      unityContent.send("WebSocket Manager", "SetKeyboardInput", "false");
    }
  };
  // console.log(`levelData: ${levelData}`);
  return (
    <div className="unity-player" style={{ maxWidth: `${maxWidth}px` }}>
      <Unity
        unityContent={unityContent}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

export default UnityPlayer;

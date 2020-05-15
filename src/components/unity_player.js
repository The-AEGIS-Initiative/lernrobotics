import React, { useEffect, useContext } from "react";
import Unity from "react-unity-webgl";
import { GamePageContext } from "../contexts/GamePageContext";
import { UnityContent } from "react-unity-webgl";

function UnityPlayer({ unityContent, level_name }) {
  const gamePageContext = useContext(GamePageContext);

  useEffect(() => {
    // When unity webgl has loaded, send assigned port
    // to unity so that unity knows which websocket to connect

    unityContent.on("Loaded", () => {
      gamePageContext.setLoading(false);

      const game_server_url = sessionStorage.getItem("gameServerUrl");

      if (game_server_url.match(/.*localhost.*/g)) {
        var url = `ws://${game_server_url}`;
      } else {
        var subdomain = game_server_url.match(/ec2-\d*-\d*-\d*-\d*/g);
        var port = game_server_url.match(/\d\d\d\d/g);
        var url = `wss://${subdomain}.aegisinitiative.io:${port}/websocket`;
      }

      console.log(url);
      const dataPacket = `${url},${level_name}`;

      // Send url to unity webgl
      // See the following for details:
      // https://github.com/elraccoone/react-unity-webgl/wiki/Communication-Guide
      unityContent.send("WebSocket Manager", "ConnectWS", dataPacket);

      console.log("Sent port to unity client");
      console.log("Game loaded"); // This log is used by cypress testing, update test if changed
    });

    unityContent.on("SaveLevelData", (jsonString) => {
      console.log(`Level data json: ${jsonString}`);
    });
  }, [gamePageContext, unityContent]);

  return (
    <Unity
      unityContent={unityContent}
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
      }}
    />
  );
}

export default UnityPlayer;

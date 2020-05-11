import React from "react";
import Unity from "react-unity-webgl";

function UnityPlayer({ unityContent }) {
  return (
    <Unity
      unityContent={unityContent}
      style={{
        aspectRatio: 16 / 9,
      }}
    />
  );
}

export default UnityPlayer;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import connectSocket from "socket.io-client";
import { UnityContent } from "react-unity-webgl";
import Amplify from "aws-amplify";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppContextProvider } from "./contexts/AppContext";

import { registerInitEvent } from "./sockets/events.js";

import config from "./aws-exports";

// Configure Amplify Environment
const amplify_build_env = process.env.REACT_APP_BUILD_ENV;
const configUpdate = config;

console.log(`amplify_build_env: ${amplify_build_env}`);
if (process.env.NODE_ENV === "development") {
  configUpdate.oauth.redirectSignIn = "http://localhost:3000/";
  configUpdate.oauth.redirectSignOut = "http://localhost:3000/";
}

if (amplify_build_env == "dev") {
  configUpdate.oauth.redirectSignIn =
    "https://development-robobot.aegisinitiative.io/";
  configUpdate.oauth.redirectSignOut =
    "https://development-robobot.aegisinitiative.io/";
}

if (amplify_build_env == "staging") {
  configUpdate.oauth.redirectSignIn =
    "https://staging-robobot.aegisinitiative.io/";
  configUpdate.oauth.redirectSignOut =
    "https://staging-robobot.aegisinitiative.io/";
}

if (amplify_build_env === "prod") {
  console.log = function no_console() {};
  configUpdate.oauth.redirectSignIn = "https://robobot.aegisinitiative.io/";
  configUpdate.oauth.redirectSignOut = "https://robobot.aegisinitiative.io/";
}

console.log(config);

configUpdate.oauth = {};
console.log(configUpdate);
Amplify.configure(configUpdate);

const unityContent = new UnityContent(
  "/unity_webgl/robobot/Build/robobot.json",
  "/unity_webgl/robobot/Build/UnityLoader.js"
);

// Configure and initialize socket connection to back-end
if (process.env.REACT_APP_BACKEND_URL == null) {
  var backEndURL = "http://localhost:8000";
} else {
  var backEndURL = process.env.REACT_APP_BACKEND_URL;
}
console.log("BACKEND_URL", backEndURL);
export var socket = connectSocket(backEndURL);

registerInitEvent(); // Get assigned container address

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <AppContextProvider>
      <App unityContent={unityContent} />
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

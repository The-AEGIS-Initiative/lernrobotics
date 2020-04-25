import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppContextProvider } from "./contexts/AppContext";
import { BrowserRouter } from "react-router-dom";

import Amplify from "aws-amplify";
import config from "./aws-exports";

// Configure Amplify Environment
const amplify_build_env = process.env.REACT_APP_BUILD_ENV;
var configUpdate = config;

console.log(`amplify_build_env: ${amplify_build_env}`);
if (process.env.NODE_ENV === "development") {
  configUpdate.oauth.redirectSignIn = "http://localhost:3000/";
  configUpdate.oauth.redirectSignOut = "http://localhost:3000/";
}

if (amplify_build_env === "dev") {
  configUpdate.oauth.redirectSignIn = "https://dev.robobot.aegisinitiative.io/";
  configUpdate.oauth.redirectSignOut =
    "https://dev.robobot.aegisinitiative.io/";
}

if (amplify_build_env === "prod") {
  configUpdate.oauth.redirectSignIn = "https://robobot.aegisinitiative.io/";
  configUpdate.oauth.redirectSignOut = "https://robobot.aegisinitiative.io/";
}

console.log(configUpdate);
Amplify.configure(configUpdate);

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

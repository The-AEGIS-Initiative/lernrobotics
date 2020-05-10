/** App.js
 * @module app
 */
import React, { useEffect, useContext } from "react";

import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminPage from "./pages/AdminPage";

import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

import connectSocket from "socket.io-client";
import { registerInitEvent } from "./sockets/events.js";
import { stopUserCode } from "./sockets/emit";

import { UnityContent } from "react-unity-webgl";

import { GamePageProvider } from "./contexts/GamePageContext";
import { AppContext } from "./contexts/AppContext";
import { ProtectedRoute } from "./hooks/auth";

import loadScript from "load-script";

// Configure markdown latex options
const MATHJAX_SCRIPT =
  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
const MATHJAX_OPTIONS = {
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  showMathMenu: false,
  showMathMenuMSIE: false,
};

// Configure and initialize socket connection to back-end
if (process.env.REACT_APP_BACKEND_URL == null) {
  var backEndURL = "http://localhost:8000";
} else {
  var backEndURL = process.env.REACT_APP_BACKEND_URL;
}
console.log("BACKEND_URL", backEndURL);
export var socket = connectSocket(backEndURL);

registerInitEvent(); // Get assigned container address

// App component containing the entire application
function App() {
  const appContext = useContext(AppContext);
  console.log(appContext.user);
  //const location = useLocation();

  useEffect(() => {
    loadScript(MATHJAX_SCRIPT, () => {
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });
  }, []);

  /**useEffect(() => {
    stopUserCode();
  }, [location])*/

  // Construct unityContent object based on level parameter
  const constructUnityContent = (level) => {
    return new UnityContent(
      `/unity_webgl/${level}/Build/${level}.json`,
      `/unity_webgl/${level}/Build/UnityLoader.js`
    );
  };

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/game/:level"
        render={(props) => (
          <GamePageProvider>
            <GamePage
              unityContent={constructUnityContent("robobot")}
              level={props.match.params.level}
              {...props}
            />
          </GamePageProvider>
        )}
      />
      <Route exact path="/unauthorized" component={UnauthorizedPage} />
      <ProtectedRoute
        exact
        path="/admin"
        component={AdminPage}
        protection_level="admin"
        user={appContext.user}
      />
    </Switch>
  );
}

export default App;

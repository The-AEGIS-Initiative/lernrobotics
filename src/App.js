/** App.js
 * @module app
 */
import React, { useEffect, useContext } from "react";

import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminPage from "./pages/AdminPage";
import LevelBuilderPage from "./pages/LevelBuilderPage";
import LoginPage from "./pages/LoginPage";

import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

import connectSocket from "socket.io-client";
import { registerInitEvent } from "./sockets/events.js";
import { stopUserCode } from "./sockets/emit";

import { GamePageProvider } from "./contexts/GamePageContext";
import { AppContext } from "./contexts/AppContext";
import { LevelBuilderProvider } from "./contexts/LevelBuilderContext";
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
function App({ unityContent }) {
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

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/game/:level"
        render={(props) => (
          <GamePageProvider>
            <GamePage
              unityContent={unityContent}
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
      />
      <ProtectedRoute
        exact
        path="/admin/levelBuilder/:level_name"
        component={(props) => (
          <GamePageProvider>
            <LevelBuilderPage
              unityContent={unityContent}
              levelName={props.match.params.level_name}
              {...props}
            />
          </GamePageProvider>
        )}
        protection_level="admin"
      />
      <Route exact path="/login-endpoint" component={LoginPage} />
    </Switch>
  );
}

export default App;

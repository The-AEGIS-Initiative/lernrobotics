/** App.js
 * @module app
 */
import React, { useEffect, useContext } from "react";

import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminPage from "./pages/AdminPage";
import LevelBuilderPage from "./pages/LevelBuilderPage";
import DocumentEditorPage from "./pages/DocumentEditorPage";
import LoginPage from "./pages/LoginPage";
import StartPage from "./pages/StartPage";
import AdminLevelPage from "./pages/AdminLevelPage";

import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

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
      <Route exact path="/" component={StartPage} />
      <Route exact path="/home" component={HomePage} />
      <ProtectedRoute
        exact
        path="/game/:level"
        component={(props) => (
          <GamePageProvider>
            <GamePage
              unityContent={unityContent}
              level={props.match.params.level}
              {...props}
            />
          </GamePageProvider>
        )}
        protection_level="user"
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
      <ProtectedRoute
        exact
        path="/admin/markdowneditor/:doc_name"
        component={(props) => (
          <DocumentEditorPage
            docName={props.match.params.doc_name}
            {...props}
          />
        )}
        protection_level="admin"
      />
      <ProtectedRoute
        exact
        path="/admin/level/:level_id"
        component={(props) => (
          <AdminLevelPage
            levelID={props.match.params.level_id}
            {...props}
          />
        )}
        protection_level="admin"
      />
      <Route exact path="/login-endpoint" component={LoginPage} />
    </Switch>
  );
}

export default App;

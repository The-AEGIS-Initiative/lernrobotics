/** App.js
 * @module app
 */
import React, { useEffect } from 'react';

import GamePage from "./pages/GamePage";
import HomePage from './pages/HomePage';

import { BrowserRouter, Switch, Route , useLocation } from 'react-router-dom';

import connectSocket from 'socket.io-client';
import { registerInitEvent } from './sockets/events.js';
import { stopUserCode } from './sockets/emit';

import { UnityContent } from "react-unity-webgl";

import { GamePageProvider } from './contexts/GamePageContext';
import { AppContextProvider } from './contexts/AppContext';

import loadScript from 'load-script'
import withAuth from './components/withAuth';

import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

const MATHJAX_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
const MATHJAX_OPTIONS = {
  tex2jax: {
    inlineMath: [ ['$','$'], ['\\(','\\)'] ],
    displayMath: [ ['$$','$$'], ['\\[','\\]'] ]
  },
  showMathMenu: false,
  showMathMenuMSIE: false
};

/**
  * WebSocket connected to node.js server
  * https://socket.io/docs/emit-cheatsheet/
  * @memberof module:app
  * @example <caption>Example usage of socket</caption>
  * () => {
  * 	socket.emit("eventServerIsListeningTo")
  * }
  */
//console.log("process.env", process.env)
console.log("BACKEND_URL", process.env.REACT_APP_BACKEND_URL)
export const socket = connectSocket(process.env.REACT_APP_BACKEND_URL);
registerInitEvent();

// App component containing the entire application
function App() {
  //const location = useLocation();

  useEffect(()=>{
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
    )
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppContextProvider>
      	<Switch>
          <Route exact path="/" component={HomePage} />
      		<Route exact path="/game/:level" render={
              (props) =>
              <GamePageProvider>
                <GamePage
                  unityContent={constructUnityContent("robobot")}
                  level={props.match.params.level}
                  {...props}
                />
              </GamePageProvider>
            }
          />
      	</Switch>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;

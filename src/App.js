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

import loadScript from 'load-script'

import Amplify from 'aws-amplify'
import config from './aws-exports'


// Configure Amplify Environment
const amplify_build_env = process.env.REACT_APP_BUILD_ENV;

console.log(`amplify_build_env: ${amplify_build_env}`)
if(process.env.NODE_ENV === 'development'){
  config.oauth.redirectSignIn = 'http://localhost:3000/';
  config.oauth.redirectSignOut = 'http://localhost:3000/';
}

if(amplify_build_env === 'dev'){
  config.oauth.redirectSignIn = 'https://dev.robobot.aegisinitiative.io/';
  config.oauth.redirectSignOut = 'https://dev.robobot.aegisinitiative.io/';
}

if(amplify_build_env === 'prod'){
  config.oauth.redirectSignIn = 'https://robobot.aegisinitiative.io/';
  config.oauth.redirectSignOut = 'https://robobot.aegisinitiative.io/';
}

Amplify.configure(config)


// Configure markdown latex options
const MATHJAX_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
const MATHJAX_OPTIONS = {
  tex2jax: {
    inlineMath: [ ['$','$'], ['\\(','\\)'] ],
    displayMath: [ ['$$','$$'], ['\\[','\\]'] ]
  },
  showMathMenu: false,
  showMathMenuMSIE: false
};

// Configure and initialize socket connection to back-end
console.log("BACKEND_URL", process.env.REACT_APP_BACKEND_URL)
export const socket = connectSocket(process.env.REACT_APP_BACKEND_URL);
registerInitEvent(); // Get assigned container address

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
  );
}

export default App;

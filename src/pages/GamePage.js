import React, { useEffect, useState, useContext, useRef } from "react";

import { Row, Col, Tabs } from "antd";

import Unity from "react-unity-webgl";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

import "./GamePage.css";

import GameSection from "../sections/game_section";
import EditorSection from "../sections/editor_section";
import ConsoleSection from "../sections/console_section";

import { GamePageContext } from "../contexts/GamePageContext";
import { AppContext } from "../contexts/AppContext";

import { useWindowSize } from "../hooks/useWindowSize";

import TopNavBar from "../components/top_nav_bar";
import MarkdownViewer from "../components/markdown_viewer";
import UnityPlayer from "../components/unity_player";

// Contains Unity game, code editor, and console
function GamePage({ unityContent, level }) {
  const gamePageContext = useContext(GamePageContext);

  // Refs for controlling various DOM element sizes
  const [consoleHeight, setConsoleHeight] = useState(null);
  const [editorWidth, setEditorWidth] = useState(null);
  const [resizedFlag, setResizedflag] = useState(false);
  const [gameWidth, setGameWidth] = useState(null);
  const gameRef = useRef(null);
  const tabsRef = useRef(null);
  const consoleRef = useRef(null);
  const navbarRef = useRef(null);
  const windowSize = useWindowSize();

  const { TabPane } = Tabs;

  var gameHeight;

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
      const dataPacket = `${url},${level}`;

      // Send url to unity webgl
      // See the following for details:
      // https://github.com/elraccoone/react-unity-webgl/wiki/Communication-Guide
      unityContent.send("WebSocket Manager", "ConnectWS", dataPacket);

      console.log("Sent port to unity client");
      console.log("Game loaded");
    });
  }, [gamePageContext, level, unityContent]);

  /**
   * Sets console height and editor width based on
   * unity game size and browser size
   */
  useEffect(() => {
    if (
      gameRef.current &&
      tabsRef.current &&
      consoleRef.current &&
      navbarRef.current
    ) {
      gameHeight = gameRef.current.offsetHeight;
      setGameWidth(gameRef.current.offsetWidth);
      console.log(`gameHeight: ${gameHeight}`);
      console.log(`windowHeight: ${windowSize.height}`);

      let tabsWidth = tabsRef.current.offsetWidth;

      let navbarHeight = navbarRef.current.offsetHeight;

      setConsoleHeight(windowSize.height - navbarHeight - gameHeight);
      console.log(`consoleHeight: ${consoleHeight}`);
      setEditorWidth(windowSize.width - tabsWidth - 7);
    }
  }, [
    gameRef.current,
    windowSize.height,
    windowSize.width,
    resizedFlag,
    gamePageContext.isLoading,
  ]);

  return (
    <div style={{ flex: 1, height: "100vh", overflow: "hidden" }}>
      <div ref={navbarRef}>
        <TopNavBar type="sub" />
      </div>
      <Row type="flex" className="container">
        <SplitterLayout
          onDragEnd={() => {
            setResizedflag(!resizedFlag);
          }}
        >
          <Col span={24}>
            <div ref={tabsRef}>
              <Tabs tabPosition={"left"} style={{ color: "white" }}>
                <TabPane tab="Game" key="1">
                  <div ref={gameRef}>
                    <Row type="flex">
                      <UnityPlayer unityContent={unityContent} />
                    </Row>
                  </div>
                  <Row
                    type="flex"
                    className="consoleSection"
                    id="console-section"
                    ref={consoleRef}
                    style={{
                      height: `${consoleHeight}px`,
                    }}
                  >
                    <ConsoleSection height={consoleHeight} width={gameWidth} />
                  </Row>
                </TabPane>
                <TabPane tab="Prompt" key="2">
                  <MarkdownViewer
                    markdownSrc={`/prompts/${level}.md`}
                  ></MarkdownViewer>
                </TabPane>
                <TabPane tab="Learn" key="3">
                  <MarkdownViewer
                    markdownSrc={`/level_specs/${level}.md`}
                  ></MarkdownViewer>
                </TabPane>
                <TabPane tab="Help" key="4">
                  <MarkdownViewer
                    markdownSrc={`/instructions.md`}
                  ></MarkdownViewer>
                </TabPane>
                <TabPane tab="API " key="5">
                  <MarkdownViewer
                    markdownSrc={`/game_api_docs.md`}
                  ></MarkdownViewer>
                </TabPane>
              </Tabs>
            </div>
          </Col>

          <Col span={24}>
            <Row type="flex" className="editorSection" id="editor-section">
              <EditorSection level={level} width={`${editorWidth}px`} />
            </Row>
          </Col>
        </SplitterLayout>
      </Row>
    </div>
  );
}

export default GamePage;

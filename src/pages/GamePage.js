import React, { useEffect, useState, useContext } from "react";

import { Row, Col, Tabs } from "antd";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

import "./GamePage.css";

import GameSection from "../sections/game_section";
import ConsoleSection from "../sections/console_section";

import { GamePageContext } from "../contexts/GamePageContext";
import { AppContext } from "../contexts/AppContext";

import { useWindowSize } from "../hooks/useWindowSize";
import { useHistory } from "react-router-dom";

import TopNavBar from "../components/top_nav_bar";
import MarkdownViewer from "../components/markdown_viewer";
import UnityPlayer from "../components/unity_player";
import HorizontalSplitLayout from "../components/horizontal_split_layout";
import PlayModeControls from "../components/play_mode_controls";
import CodeEditor from "../components/code_editor";

import * as graphqlController from "../graphql/graphql-controller";
// Contains Unity game, code editor, and console
function GamePage({ unityContent, level }) {
  const gamePageContext = useContext(GamePageContext);
  const appContext = useContext(AppContext);
  const history = useHistory();
  // Refs for controlling various DOM element sizes
  const [resizedFlag, setResizedflag] = useState(false);

  const windowSize = useWindowSize();

  const { TabPane } = Tabs;

  useEffect(() => {
    async function fetchData() {
      console.log(appContext.user);
      const username = appContext.username;
      const level_name = level;
      const levelData = await graphqlController.getLevel({
        level_name: level_name,
      });
      const progressData = await graphqlController.getProgress({
        username: username,
        level_name: level_name,
      });
      console.log(progressData);
      console.log(levelData);
      if (progressData.length == 0) {
        if (levelData.length == 0) {
          // No level data, invalid level!
          history.push("/"); // Redirect to home
        } else {
          gamePageContext.setEditorContent(levelData[0].default_code);
        }
      } else {
        gamePageContext.setEditorContent(progressData[0].user_code);
      }
    }
    if (appContext.isAuth) {
      fetchData();
    }
  }, [gamePageContext.isLoading]);

  return (
    <div style={{ flex: 1, height: "100vh", overflow: "hidden" }}>
      <TopNavBar type="sub" />
      <div type="flex" className="container">
        <SplitterLayout
          onDragEnd={() => {
            setResizedflag(!resizedFlag);
          }}
        >
          <Tabs tabPosition={"left"} style={{ color: "white", width: "100%" }}>
            <TabPane tab="Game" key="1" style={{ width: "100%" }}>
              <HorizontalSplitLayout
                top_section={
                  <UnityPlayer unityContent={unityContent} level_name={level} />
                }
                bottom_section={
                  <ConsoleSection style={{ backgroundColor: "black" }} />
                }
                dependent="bottom"
                parent_height={windowSize.height - 6}
                update_flags={resizedFlag}
              />
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
              <MarkdownViewer markdownSrc={`/instructions.md`}></MarkdownViewer>
            </TabPane>
            <TabPane tab="API " key="5">
              <MarkdownViewer
                markdownSrc={`/game_api_docs.md`}
              ></MarkdownViewer>
            </TabPane>
          </Tabs>
          <Col>
            <Row>
              <CodeEditor mode="python" />
            </Row>
            <Row type="flex" style={{ justifyContent: "flex-end" }}>
              <PlayModeControls level_name={level} />
            </Row>
          </Col>
        </SplitterLayout>
      </div>
    </div>
  );
}

export default GamePage;

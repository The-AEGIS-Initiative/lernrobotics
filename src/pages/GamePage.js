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
  const [task, setTask] = useState("");
  const [tutorial, setTutorial] = useState("");
  const [levelData, setLevelData] = useState("");

  const windowSize = useWindowSize();

  const { TabPane } = Tabs;

  // Fetch level data and user progress from graphql api
  useEffect(() => {
    async function fetchData() {
      const username = appContext.username;
      const level_name = level;

      // Fetch level data
      const levelData = await graphqlController.getLevel({
        level_name: level_name,
      });
      if (levelData.length == 0) {
        // No level data, invalid level!
        // history.push("/"); // Redirect to home
      } else {
        // Set task, tutorial, and leveldata content
        setTask(levelData[0].task);
        setTutorial(levelData[0].tutorial);
        setLevelData(levelData[0].level_data);

        // Fetch user progress
        const progressData = await graphqlController.getProgress({
          username: username,
          level_name: level_name,
        });
        if (progressData.length == 0) {
          // No user progress
          gamePageContext.setEditorContent(levelData[0].default_code);
        } else {
          // Existing user progress
          gamePageContext.setEditorContent(progressData[0].user_code);
        }
      }
    }
    if (appContext.isAuth) {
      // Wrapper to call async function inside useEffect()
      fetchData();
    }
  }, [gamePageContext.isLoading]);

  return (
    <div className="container">
      <TopNavBar type="sub" className="nav-container" />
      <SplitterLayout
        className="content-container"
        onDragEnd={() => {
          setResizedflag(!resizedFlag);
        }}
      >
        <Tabs tabPosition={"left"} style={{ color: "white", width: "100%" }}>
          <TabPane tab="Game" key="1">
            <HorizontalSplitLayout
              top_section={
                <UnityPlayer
                  unityContent={unityContent}
                  level_name={level}
                  levelData={levelData}
                />
              }
              bottom_section={
                <ConsoleSection style={{ backgroundColor: "black" }} />
              }
              dependent="bottom"
              parent_height={windowSize.height - 6}
              update_flags={resizedFlag}
            />
          </TabPane>
          <TabPane tab="Task" key="2">
            <MarkdownViewer markdownText={task}></MarkdownViewer>
          </TabPane>
          <TabPane tab="Tutorial" key="3">
            <MarkdownViewer markdownText={tutorial}></MarkdownViewer>
          </TabPane>
          <TabPane tab="Help" key="4">
            <MarkdownViewer markdownSrc={`/instructions.md`}></MarkdownViewer>
          </TabPane>
          <TabPane tab="API " key="5">
            <MarkdownViewer markdownSrc={`/game_api_docs.md`}></MarkdownViewer>
          </TabPane>
        </Tabs>
        <div className="right-section-container">
          <div className="content-container">
            <CodeEditor
              mode="python"
              placeholder={gamePageContext.editorContent}
              handleChange={(value) => gamePageContext.setEditorContent(value)}
            />
          </div>
          <div className="footer-container">
            <PlayModeControls level_name={level} />
          </div>
        </div>
      </SplitterLayout>
    </div>
  );
}

export default GamePage;

import React, { useEffect, useState, useContext, useRef } from "react";

import { Row, Col, Tabs, Button } from "antd";

import Unity from "react-unity-webgl";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import "./LevelBuilderPage.css";

import { GamePageContext } from "../contexts/GamePageContext";
import { AppContext } from "../contexts/AppContext";
import { LevelBuilderContext } from "../contexts/LevelBuilderContext";

import { useWindowSize } from "../hooks/useWindowSize";

import TopNavBar from "../components/top_nav_bar";
import MarkdownViewer from "../components/markdown_viewer";
import UnityPlayer from "../components/unity_player";
import HorizontalSplitLayout from "../components/horizontal_split_layout";
import PlayModeControls from "../components/play_mode_controls";
import CodeEditor from "../components/code_editor";
import MarkdownEditor from "../components/markdown_editor";

import * as graphqlController from "../graphql/graphql-controller";

import styles from "../style_modules/button.module.css";

// Contains Unity game, code editor, and console
function LevelBuilderPage({ unityContent, levelName }) {
  // Refs for controlling various DOM element sizes
  const appContext = useContext(AppContext);
  const gamePageContext = useContext(GamePageContext);

  const [resizedFlag, setResizedflag] = useState(false);
  const [tabKey, setTabKey] = useState("1");

  const levelNameRef = useRef(null);

  const windowSize = useWindowSize();

  const { TabPane } = Tabs;

  var playTestMode = false;

  const [editMode, setEditMode] = useState(true);
  const [taskContent, setTaskContent] = useState("");
  const [tutorialContent, setTutorialContent] = useState("");
  const [defaultCodeContent, setDefaultCodeContent] = useState("");
  const [levelData, setLevelData] = useState("");

  useEffect(() => {
    unityContent.on("SaveLevelData", (jsonString) => {
      console.log(`Level data json: ${jsonString}`);
      setLevelData(jsonString);
    });
  }, [unityContent]);

  const handleTabChange = (key) => {
    setTabKey(key);
  };

  const publishLevelData = async () => {
    pushLevelData();
    console.log(levelName);
    console.log(defaultCodeContent);
    console.log(appContext.username);
    console.log(taskContent);
    console.log(tutorialContent);
    console.log(levelData);
    var jsonObject = await graphqlController.upsertPublishedLevel({
      level_name: levelName,
      default_code: defaultCodeContent,
      creator: appContext.username,
      task: taskContent,
      tutorial: tutorialContent,
      level_data: levelData,
    });
  };

  const pushLevelData = async () => {
    console.log(levelName);
    console.log(defaultCodeContent);
    console.log(appContext.username);
    console.log(taskContent);
    console.log(tutorialContent);
    console.log(levelData);
    var jsonObject = await graphqlController.upsertLevel({
      level_name: levelName,
      default_code: defaultCodeContent,
      creator: appContext.username,
      task: taskContent,
      tutorial: tutorialContent,
      level_data: levelData,
    });
  };

  return (
    <div className="container">
      <TopNavBar type="sub" levelName={levelName} className="nav-container" />

      <Tabs
        tabPosition={"left"}
        activeKey={tabKey}
        onChange={handleTabChange}
        className="content-container"
      >
        <TabPane tab="Game" key="1">
          <UnityPlayer
            unityContent={unityContent}
            level_name="level_builder"
            inFocus={tabKey == "1"}
          />
        </TabPane>
        <TabPane tab="Default Code" key="2">
          <CodeEditor
            mode="python"
            placeholder={defaultCodeContent}
            handleChange={(value) => setDefaultCodeContent(value)}
          />
        </TabPane>
        <TabPane tab="Prompt" key="3">
          <MarkdownEditor
            handleChange={(e) => {
              setTaskContent(e);
            }}
          />
        </TabPane>
        <TabPane tab="Learn" key="4">
          <MarkdownEditor
            handleChange={(e) => {
              setTutorialContent(e);
            }}
          />
        </TabPane>
        <TabPane tab="Help" key="5">
          <MarkdownViewer markdownSrc={`/instructions.md`}></MarkdownViewer>
        </TabPane>

        <TabPane tab="API " key="6">
          <MarkdownViewer markdownSrc={`/game_api_docs.md`}></MarkdownViewer>
        </TabPane>
      </Tabs>

      <div className="footer-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={pushLevelData}
            loading={gamePageContext.isLoading}
            className={styles.dark_control_buttons}
          >
            Save Level
          </Button>
          <Button
            onClick={publishLevelData}
            loading={gamePageContext.isLoading}
            className={styles.dark_control_buttons}
          >
            Publish Level
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LevelBuilderPage;

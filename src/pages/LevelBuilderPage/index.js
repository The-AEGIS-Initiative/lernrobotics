import React, { useEffect, useState, useContext, useRef } from "react";

import { Row, Col, Tabs, Button } from "antd";

import Unity from "react-unity-webgl";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import "./index.css";
import styles from "style.module.css";

import { GamePageContext } from "contexts/GamePageContext";
import { AppContext } from "contexts/AppContext";
import { LevelBuilderContext } from "contexts/LevelBuilderContext";

import { useWindowSize } from "hooks/useWindowSize";

import TopNavBar from "components/top_nav_bar";
import MarkdownViewer from "components/markdown_viewer";
import UnityPlayer from "components/unity_player";
import HorizontalSplitLayout from "components/horizontal_split_layout";
import CodeEditor from "components/code_editor";
import MarkdownEditor from "components/markdown_editor";

import * as graphqlController from "graphql/graphql-controller";

// Contains Unity game, code editor, and console
function LevelBuilderPage({ unityContent, levelName }) {
  // Refs for controlling various DOM element sizes
  const appContext = useContext(AppContext);
  const gamePageContext = useContext(GamePageContext);

  const [resizedFlag, setResizedflag] = useState(false);
  const [tabKey, setTabKey] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks whether code is currently being submitted
  const [gameAPI, setGameAPI] = useState("");
  const [faq, setFaq] = useState("");

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
    async function fetchData() {
      // Fetch level data
      const data = await graphqlController.getLevel({
        level_name: levelName,
      });
      if (data.length == 0) {
        setLevelData("blank level");
        console.log("New Level!");
      } else {
        // Set task, tutorial, and levelData content
        setTaskContent(data[0].task);
        setTutorialContent(data[0].tutorial);
        setDefaultCodeContent(data[0].default_code);
        setLevelData(data[0].level_data);
      }

      // Fetch GameAPI
      const gameAPIData = await graphqlController.getDoc({
        doc_name: "GameAPI",
      });
      if (gameAPIData.length > 0) {
        setGameAPI(gameAPIData[0].doc_content);
      }

      // Fetch FAQ
      const faqData = await graphqlController.getDoc({
        doc_name: "FAQ",
      });
      if (faqData.length > 0) {
        setFaq(faqData[0].doc_content);
      }
    }

    fetchData();
    //console.log(`levelData: ${levelData}`);
  }, []);

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
    setIsSubmitting(true);
    var jsonObject = await graphqlController.upsertPublishedLevel({
      level_name: levelName,
      default_code: defaultCodeContent,
      creator: appContext.username,
      task: taskContent,
      tutorial: tutorialContent,
      level_data: levelData,
    });
    setIsSubmitting(false);
  };

  const pushLevelData = async () => {
    console.log(levelName);
    console.log(defaultCodeContent);
    console.log(appContext.username);
    console.log(taskContent);
    console.log(tutorialContent);
    console.log(levelData);
    setIsSubmitting(true);
    var jsonObject = await graphqlController.upsertLevel({
      level_name: levelName,
      default_code: defaultCodeContent,
      creator: appContext.username,
      task: taskContent,
      tutorial: tutorialContent,
      level_data: levelData,
    });
    setIsSubmitting(false);
  };

  // Necessary check to ensure unity content waits until level data is fetched
  if (levelData != "") {
    console.log(`taskContent: ${taskContent}`);
    console.log(`tutorialContent: ${tutorialContent}`);
    return (
      <div className="level-builder-container">
        <TopNavBar
          type="sub"
          levelName={levelName}
          className="nav-container"
          backgroundColor="#222222"
          theme="dark"
        />

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
              levelData={levelData}
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
              mode={"markdown"}
              placeholder={taskContent}
              handleChange={(e) => {
                setTaskContent(e);
              }}
            />
          </TabPane>
          <TabPane tab="Learn" key="4">
            <MarkdownEditor
              mode={"markdown"}
              placeholder={tutorialContent}
              handleChange={(e) => {
                setTutorialContent(e);
              }}
            />
          </TabPane>
          <TabPane tab="Help" key="5">
            <MarkdownViewer markdownText={faq} />
          </TabPane>

          <TabPane tab="API " key="6">
            <MarkdownViewer markdownText={gameAPI} />
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
              loading={gamePageContext.isLoading || isSubmitting}
              className={`${styles.ui_font} ${styles.dark_buttons}`}
            >
              Save Level
            </Button>
            <Button
              onClick={publishLevelData}
              loading={gamePageContext.isLoading || isSubmitting}
              className={`${styles.ui_font} ${styles.dark_buttons}`}
            >
              Publish Level
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default LevelBuilderPage;

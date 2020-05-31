import React, { useEffect, useState, useContext, useRef } from "react";

import { Row, Col, Tabs } from "antd";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

import "./GamePage.css";
import styles from "../style.module.css";

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
import LoginRegisterModal from "../components/login_register_modal";
import LoadingScreen from "../components/loading_screen";
import GameOverModal from "../components/game_over_modal";
import Leaderboard from "../components/leaderboard";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [gameOverMsg, setGameOverMsg] = useState("");
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

  const editorRef = useRef(null);

  const windowSize = useWindowSize();

  const { TabPane } = Tabs;

  // Fetch level data and user progress from graphql api
  useEffect(() => {
    async function fetchData() {
      const username = appContext.username;
      const level_name = level;

      // Fetch level data
      const data = await graphqlController.getLevel({
        level_name: level_name,
      });
      if (data.length == 0) {
        // No level data, invalid level!
        // history.push("/"); // Redirect to home
        console.log("wefodi");
      } else {
        // Set task, tutorial, and leveldata content
        setTask(data[0].task);
        setTutorial(data[0].tutorial);
        setLevelData(data[0].level_data);
      }

      // Fetch user progress
      const progressData = await graphqlController.getProgress({
        username: username,
        level_name: level_name,
      });
      if (progressData.length == 0) {
        // No user progress
        gamePageContext.setEditorContent(data[0].default_code);
      } else {
        // Existing user progress
        gamePageContext.setEditorContent(progressData[0].user_code);
      }
    }

    if (appContext.isAuth) {
      // Wrapper to call async function inside useEffect()
      fetchData();
    } else {
      fetchHelloWorld();
    }
    setIsLoading(false);
    //console.log(`levelData: ${levelData}`);
  }, []);

  const fetchHelloWorld = () => {
    console.log("fetching default level");
    fetch("/level_specs/hello_world.md")
      .then((r) => r.text())
      .then((data) => {
        setTutorial(data);
      });

    fetch("/prompts/hello_world.md")
      .then((r) => r.text())
      .then((data) => {
        setTask(data);
      });

    fetch("/default_code/hello_world.py")
      .then((r) => r.text())
      .then((data) => {
        gamePageContext.setEditorContent(data);
      });

    fetch("/level_specs/hello_world.md")
      .then((r) => r.text())
      .then((data) => {
        setLevelData(data);
      });
  };

  useEffect(() => {
    async function updateLeaderboard(gameOverData) {
      if (gameOverData.isSuccess) {
        // If passed level
        // TODO: FINIISh
      }
    }
    unityContent.on("GameOver", (gameOverJson) => {
      console.log(gameOverJson);
      const data = JSON.parse(gameOverJson);
      setIsSuccess(data.isSuccess);
      setGameOverMsg(data.message);
      setTimeTaken(data.timeTaken);
      setGameOverVisible(true);
    });
  }, []);

  const handleGuestLogin = () => {};

  // Necessary check to ensure unity content waits until level data is fetched
  if (levelData != "") {
    //console.log(`levelData: ${levelData}`);
    return (
      <div style={{ overflow: "hidden", height: "100vh" }}>
        <div
          className="game-container"
          style={{ opacity: gamePageContext.isLoading ? 0 : 1 }}
        >
          <TopNavBar
            type="sub"
            className="nav-container"
            theme="dark"
            backgroundColor="#222222"
          />
          <SplitterLayout
            className="content-container"
            onDragEnd={() => {
              setResizedflag(!resizedFlag);
            }}
          >
            <Tabs
              tabPosition={"left"}
              style={{ color: "white", width: "100%" }}
            >
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
              <TabPane tab="Leaderboard" key="4">
                <Leaderboard
                  rankings={[
                    { username: "kevin", time: 21, date: "today" },
                    { username: "kevin2", time: 12, date: "today" },
                  ]}
                />
              </TabPane>
              <TabPane tab="FAQ" key="5">
                <MarkdownViewer
                  markdownSrc={`/instructions.md`}
                ></MarkdownViewer>
              </TabPane>
              <TabPane tab="API " key="6">
                <MarkdownViewer
                  markdownSrc={`/game_api_docs.md`}
                ></MarkdownViewer>
              </TabPane>
            </Tabs>
            <div className="right-section-container">
              <div className="content-container">
                <CodeEditor
                  mode="python"
                  placeholder={gamePageContext.editorContent}
                  handleChange={(value) =>
                    gamePageContext.setEditorContent(value)
                  }
                  isLoading={gamePageContext.isLoading}
                />
              </div>
              <div className="footer-container">
                <PlayModeControls level_name={level} />
              </div>
            </div>
          </SplitterLayout>
          <LoginRegisterModal onSubmit={handleGuestLogin} />
        </div>
        {gamePageContext.isLoading && <LoadingScreen />}
        <GameOverModal
          visible={gameOverVisible}
          message={`${gameOverMsg};Time taken: ${timeTaken} seconds`}
          isSuccess={isSuccess}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default GamePage;

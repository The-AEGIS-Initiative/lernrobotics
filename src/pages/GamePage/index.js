import React, { useEffect, useState, useContext } from "react";

import { Tabs, Button } from "antd";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import Joyride from "react-joyride";
import * as Diff3 from "node-diff3";
import ReactTooltip from "react-tooltip";

import "./index.css";
import styles from "style.module.css";

import { GamePageContext } from "contexts/GamePageContext";
import { AppContext } from "contexts/AppContext";

import { useWindowSize } from "hooks/useWindowSize";
import { useHistory } from "react-router-dom";

import TopNavBar from "components/top_nav_bar";
import MarkdownViewer from "components/markdown_viewer";
import UnityPlayer from "components/unity_player";
import HorizontalSplitLayout from "components/horizontal_split_layout";
import CodeEditor from "components/code_editor";
import LoadingScreen from "components/loading_screen";
import GameModal from "components/game_modal";
import Leaderboard from "components/leaderboard";
import Console from "components/console";

import * as graphqlController from "graphql/graphql-controller";

import { submitUserCode, stopUserCode } from "sockets/emit";

import {
  RocketOutlined,
  BuildOutlined,
  BulbOutlined,
  FileTextOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

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
  const [defaultCode, setDefaultCode] = useState("");
  const [stars, setStars] = useState(0);
  const [levelDisplayName, setLevelDisplayName] = useState("");

  const [modalContent, setModalContent] = useState({
    visible: false,
    title: "",
    msg: "",
  });
  const [rankings, setRankings] = useState([]);
  const [gameAPI, setGameAPI] = useState("");
  const [faq, setFaq] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks whether code is currently being submitted

  const windowSize = useWindowSize();
  // console.log(windowSize);
  const { TabPane } = Tabs;

  // Update user progress with specified number of stars
  const updateProgressStars = async ({ stars }) => {
    const progressData = await graphqlController.getProgress({
      username: appContext.username,
      level_name: level,
    });
    const res = await graphqlController.upsertProgress({
      level_name: level,
      user_code: progressData[0].user_code,
      default_code: defaultCode,
      stars,
    });
  };

  // Fetch level data and user progress from graphql api
  useEffect(() => {
    async function fetchData() {
      const { username } = appContext;
      const level_name = level;

      // Fetch level data
      const data = await graphqlController.getPublishedLevel({
        level_name,
      });
      if (data.length === 0) {
        // No level data, invalid level!
        // history.push("/"); // Redirect to home
      } else {
        // Set task, tutorial, and leveldata content
        setTask(data[0].task);
        setTutorial(data[0].tutorial);
        setLevelData(data[0].level_data);
        setStars(data[0].stars);

        // Parse task for intro modal
        // Get 2nd non-empty line
        let i = 0;
        data[0].task.split("\n").forEach((line) => {
          if (line !== "") {
            if (i === 1) {
              setModalContent({
                visible: false,
                title: "Your Task",
                msg: line.match(/[^*].*[^*]/g).toString(),
              });
            }
            i += 1;
          }
        });

        const contentSchema = await graphqlController.getDoc({
          doc_name: "ContentSchema",
        });

        const contentData = JSON.parse(contentSchema[0].doc_content);

        contentData.modules.map((module) => {
          const displayName = module.levels.find((o) => o.level_name == level);
          if (displayName != null) {
            setLevelDisplayName(displayName.title);
          }
        });

        // Fetch user progress
        if (appContext.isAuth) {
          const progressData = await graphqlController.getProgress({
            username,
            level_name,
          });
          if (progressData.length == 0) {
            // No user progress
            setDefaultCode(data[0].default_code);
            gamePageContext.setEditorContent(data[0].default_code);
          } else {
            // Existing user progress

            // Attempt to apply any skeleton code updates to user code.
            const old_default_code = progressData[0].default_code;
            const new_default_code = data[0].default_code;
            const { user_code } = progressData[0];

            setDefaultCode(new_default_code); // Not what is displayed in editor necessarily. Just storing in state for future use.

            if (old_default_code == null || old_default_code == "") {
              // Backwards compatibility for when progressData did not contain default_code info
              gamePageContext.setEditorContent(progressData[0].user_code);
            } else {
              // Merge skeleton code changes into user code (prioritizes user changes over default code changes)
              const mergedUserCode = mergeUserCode(
                old_default_code,
                new_default_code,
                user_code
              );
              gamePageContext.setEditorContent(mergedUserCode);
            }
          }

          // Fetch leaderboard
          const rankingData = await graphqlController.getLevelSubmissions({
            level_name,
          });
          setRankings(rankingData);

          // Fetch GameAPI
          const gameAPIData = await graphqlController.getDoc({
            doc_name: "GameAPI",
          });

          // Fetch FAQ
          const faqData = await graphqlController.getDoc({
            doc_name: "FAQ",
          });

          if (gameAPIData.length > 0) {
            setGameAPI(gameAPIData[0].doc_content);
          }

          if (faqData.length > 0) {
            setFaq(faqData[0].doc_content);
          }
        } else {
          gamePageContext.setEditorContent(data[0].default_code);

          // Fetch GameAPI
          const gameAPIData = await graphqlController.getDocAsGuest({
            doc_name: "GameAPI",
          });

          // Fetch FAQ
          const faqData = await graphqlController.getDocAsGuest({
            doc_name: "FAQ",
          });

          if (gameAPIData.length > 0) {
            setGameAPI(gameAPIData[0].doc_content);
          }

          if (faqData.length > 0) {
            setFaq(faqData[0].doc_content);
          }
        }
      }
    }

    fetchData();
    setIsLoading(false);
    // console.log(`levelData: ${levelData}`);
  }, [appContext.isAuth, appContext.username, level]);

  useEffect(() => {
    async function updateLeaderboard(gameOverData) {
      if (gameOverData.isSuccess) {
        // If passed level
        const cur_submission = await graphqlController.getUserSubmission({
          username: appContext.username,
          level_name: level,
        });

        if (cur_submission.length > 0) {
          // If previous submission exists
          const score = parseFloat(cur_submission[0].score);
          if (parseFloat(gameOverData.timeTaken) <= score) {
            // TODO: Handle both maximizing score and minimizing time
            // Update current highscore
            console.log("updating previous entry!");
            await graphqlController.updateUserSubmission({
              submission_id: cur_submission[0].id,
              score: gameOverData.timeTaken.toString(),
            });
          }
        } else {
          // Create new submission
          await graphqlController.createSubmission({
            level_name: level,
            username: appContext.username,
            score: gameOverData.timeTaken.toString(),
          });
        }

        // Update leaderboard
        const rankingData = await graphqlController.getLevelSubmissions({
          level_name: level,
        });
        setRankings(rankingData);
      }
    }
    unityContent.on("GameOver", (gameOverJson) => {
      const data = JSON.parse(gameOverJson);
      setIsSuccess(data.isSuccess);

      if (data.isSuccess) {
        updateProgressStars({ stars: 3 });
      } else {
        updateProgressStars({ stars: 0 });
      }

      setModalContent({
        visible: true,
        msg: `${data.message};${data.timeTaken}`,
        title: data.isSuccess ? "Success!" : "Try Again!",
      });
      updateLeaderboard(data); // Submit score to leaderboard
    });

    unityContent.on("Start", () => {
      console.log("Game started");
    });
  }, [appContext.username, level, unityContent]);

  useEffect(() => {
    if (!gamePageContext.isLoading && level != "hello_world") {
      // Intro modal
      if (modalContent.title != "") {
        setModalContent({
          visible: true,
          title: modalContent.title,
          msg: modalContent.msg,
        });
      }
    }
  }, [gamePageContext.isLoading, level, modalContent.msg, modalContent.title]);

  const mergeUserCode = (old_default, new_default, user_code) => {
    /**
     * Merge Process:
     * 1) Compute patches from old_default_code and user_code
     * 2) Apply patches to new_default_code
     */
    const result = Diff3.merge(
      new_default.replace(/\n/g, "\\n").replace(/t* {4}/g, "\\t"),
      old_default.replace(/\n/g, "\\n").replace(/t* {4}/g, "\\t"),
      user_code.replace(/\n/g, "\\n").replace(/t* {4}/g, "\\t"),
      { stringSeperator: /\s{1}/ }
    );
    // return user_code
    return result.result
      .join(" ")
      .split("\\n")
      .join("\n")
      .replace(/\\t/g, "    ");
  };

  // Sandbox and execute user code
  // Save user code to backend database
  const pushUserCode = async () => {
    if (appContext.isAuth) {
      const res = await graphqlController.upsertProgress({
        level_name: level,
        user_code: gamePageContext.editorContent,
        default_code: defaultCode,
        stars: 0,
      });
      submitUserCode(gamePageContext.editorContent);
    }
  };

  const onboardingSteps = [
    {
      target: "body",
      title: "Welcome to LERNRobotics!",
      content: "Take a quick tour of your robotics workspace!",
      placement: "center",
      disableBeacon: true,
    },
    {
      target: ".unity-player",
      title: "Robot World",
      content:
        "Here is the viewport into the robot world with full physics capabilities",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: ".console",
      title: "Console",
      content:
        "This console lets your robot communicate with you (via print statements!)",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: ".ace_scroller",
      title: "Code Editor",
      content: "Program your robot using python",
      placement: "left",
      disableBeacon: true,
    },
    {
      target: ".task-tab",
      title: "Task",
      content: "This tab contains your task specifications",
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: ".tutorial-tab",
      title: "Tutorial",
      content:
        "This tab contains educational material to help you complete the level",
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: ".leaderboard-tab",
      title: "Leaderboard",
      content:
        "See how your robot stacks up against robots all around the world",
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: ".layout-splitter",
      title: "Resize your workspace",
      content: "You can click and drag here to resize your workspace",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: ".submit-button",
      title: "Submit your code",
      content: "Try pressing this button and see your robot go!",
      placement: "top-left",
      disableBeacon: true,
    },
  ];

  // Necessary check to ensure unity content waits until level data is fetched
  if (levelData != "") {
    // console.log(`levelData: ${levelData}`);
    return (
      <div style={{ overflow: "hidden", height: "100vh" }}>
        <div className="game-container">
          {!gamePageContext.isLoading && level == "hello_world" && (
            <Joyride steps={onboardingSteps} continuous showSkipButton />
          )}
          <TopNavBar
            type="sub"
            className="nav-container"
            theme="dark"
            backgroundColor="#172437"
            title={levelDisplayName}
          />
          <SplitterLayout
            className="content-container"
            percentage
            onDragEnd={() => {
              setResizedflag(!resizedFlag);
            }}
          >
            <Tabs tabPosition="left" style={{ color: "white", width: "100%" }}>
              <TabPane tab={<RocketOutlined data-tip="Simulation" />} key="1">
                <HorizontalSplitLayout
                  top_section={
                    <UnityPlayer
                      unityContent={unityContent}
                      level_name={level}
                      levelData={levelData}
                      className="unity_viewport"
                    />
                  }
                  bottom_section={
                    <Console
                      className="console"
                      style={{ backgroundColor: "black" }}
                      unityContent={unityContent}
                    />
                  }
                  dependent="bottom"
                  parent_height={windowSize.height - 45}
                  update_flags={resizedFlag}
                />
              </TabPane>
              <TabPane
                tab={<BuildOutlined data-tip="Tasks" className="task-tab" />}
                key="2"
                data-cy="tab"
              >
                <MarkdownViewer markdownText={task} />
              </TabPane>
              <TabPane
                tab={
                  <BulbOutlined data-tip="Tutorials" className="tutorial-tab" />
                }
                key="3"
                data-cy="tab"
              >
                <MarkdownViewer markdownText={tutorial} />
              </TabPane>
              <TabPane
                tab={
                  <TrophyOutlined
                    data-tip="Leaderboard"
                    className="leaderboard-tab"
                  />
                }
                key="4"
                data-cy="tab"
              >
                <Leaderboard rankings={rankings} />
              </TabPane>
              {/** <TabPane tab={<SolutionOutlined data-tip="FAQ"/>} key="5" data-cy="tab" >
                <MarkdownViewer markdownText={faq} />
              </TabPane> */}
              <TabPane
                tab={<FileTextOutlined data-tip="API" />}
                key="6"
                data-cy="tab"
              >
                <MarkdownViewer markdownText={gameAPI} />
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
                  className="code-editor"
                />
              </div>
              <div className="footer-container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="primary"
                    className={`${styles.ui_font} ${styles.dark_buttons} stop-button`}
                    loading={gamePageContext.isLoading}
                    onClick={() => {
                      setIsSubmitting(false);
                      stopUserCode();
                    }}
                  >
                    Stop
                  </Button>
                  <Button
                    type="primary"
                    className={`${styles.ui_font} ${styles.dark_buttons} submit-button`}
                    loading={gamePageContext.isLoading || isSubmitting}
                    onClick={() => {
                      setIsSubmitting(true);
                      pushUserCode();
                    }}
                  >
                    {isSubmitting ? "Running" : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </SplitterLayout>
        </div>

        {gamePageContext.isLoading && <LoadingScreen />}

        <GameModal
          visible={modalContent.visible}
          message={modalContent.msg}
          title={modalContent.title}
          handleOk={() => {
            setModalContent({ visible: false, title: "", msg: "" });
          }}
          handleCancel={() => {
            setModalContent({ visible: false, title: "", msg: "" });
          }}
        />
        <ReactTooltip place="right" effect="solid" backgroundColor="#172437" />
      </div>
    );
  }
  return null;
}

export default GamePage;

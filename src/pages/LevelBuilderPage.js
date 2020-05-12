import React, { useEffect, useState, useContext } from "react";

import { Row, Col, Tabs, Button } from "antd";

import Unity from "react-unity-webgl";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

import "./GamePage.css";

import GameSection from "../sections/game_section";
import ConsoleSection from "../sections/console_section";

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

// Contains Unity game, code editor, and console
function LevelBuilderPage({ unityContent, level_name }) {
  const levelBuilderContext = useContext(LevelBuilderContext);

  // Refs for controlling various DOM element sizes
  const [resizedFlag, setResizedflag] = useState(false);

  const windowSize = useWindowSize();

  const { TabPane } = Tabs;

  var playTestMode = false;

  return (
    <div style={{ flex: 1, height: "100vh", overflow: "hidden" }}>
      <TopNavBar type="sub" />
      <Row>
        <Button onClick={() => levelBuilderContext.setEditMode(true)}>
          Edit Mode
        </Button>
        <Button onClick={() => levelBuilderContext.setEditMode(false)}>
          Play Test Mode
        </Button>
      </Row>
      <div type="flex" className="container">
        <Tabs tabPosition={"left"} style={{ color: "white", width: "100%" }}>
          <TabPane tab="Game" key="1" style={{ width: "100%" }}>
            <UnityPlayer
              unityContent={unityContent}
              level="level_builder"
              style={{ width: "100%" }}
            />
          </TabPane>
          <TabPane tab="Prompt" key="2">
            <MarkdownEditor
              level_name={level_name}
              handleChange={(e) => {
                levelBuilderContext.setTaskContent(e);
              }}
            />
          </TabPane>
          <TabPane tab="Learn" key="3">
            <MarkdownEditor
              level_name={level_name}
              handleChange={(e) => {
                levelBuilderContext.setTutorialContent(e);
              }}
            />
          </TabPane>
          <TabPane tab="Help" key="4">
            <MarkdownViewer markdownSrc={`/instructions.md`}></MarkdownViewer>
          </TabPane>
          <TabPane tab="API " key="5">
            <MarkdownViewer markdownSrc={`/game_api_docs.md`}></MarkdownViewer>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default LevelBuilderPage;

import React, { useEffect, useState, useContext } from "react";

import { Row, Col, Tabs } from "antd";

import Unity from "react-unity-webgl";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

import "./GamePage.css";

import GameSection from "../sections/game_section";
import ConsoleSection from "../sections/console_section";

import { GamePageContext } from "../contexts/GamePageContext";
import { AppContext } from "../contexts/AppContext";

import { useWindowSize } from "../hooks/useWindowSize";

import TopNavBar from "../components/top_nav_bar";
import MarkdownViewer from "../components/markdown_viewer";
import UnityPlayer from "../components/unity_player";
import HorizontalSplitLayout from "../components/horizontal_split_layout";
import PlayModeControls from "../components/play_mode_controls";
import CodeEditor from "../components/code_editor";

// Contains Unity game, code editor, and console
function GamePage({ level }) {
  const gamePageContext = useContext(GamePageContext);

  // Refs for controlling various DOM element sizes
  const [resizedFlag, setResizedflag] = useState(false);

  const windowSize = useWindowSize();

  const { TabPane } = Tabs;

  const handleEditorChange = (content) => {
    gamePageContext.setEditorContent(content);
  };

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
                  <UnityPlayer level_name={level} style={{ width: "100%" }} />
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
              <CodeEditor
                level_name={level}
                mode="python"
                handleChange={(content) => handleEditorChange(content)}
              />
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

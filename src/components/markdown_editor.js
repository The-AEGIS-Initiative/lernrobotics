import React, { useContext, useRef, useState, useEffect } from "react";

import { Row, Col, Button } from "antd";
import styles from "../style_modules/button.module.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import { useHotkeys } from "react-hotkeys-hook";

import { postData, getData } from "../components/HttpController";
import { submitUserCode, stopUserCode } from "../sockets/emit";

import SplitterLayout from "react-splitter-layout";
import MarkdownViewer from "../components/markdown_viewer";
import CodeEditor from "../components/code_editor";
import PlayModeControls from "../components/play_mode_controls";

/**
 * Split-view markdown editor
 */

function MarkdownEditor({ level_name, handleChange }) {
  const [content, setContent] = useState("");
  const [resizedFlag, setResizedflag] = useState(false);

  return (
    <SplitterLayout
      onDragEnd={() => {
        setResizedflag(!resizedFlag);
      }}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Col>
        <Row>
          <CodeEditor
            level_name={level_name}
            mode="markdown"
            handleChange={(e) => {
              setContent(e);
              console.log(content);
              handleChange(e);
            }}
          />
        </Row>
      </Col>
      <Col>
        <Row>
          <MarkdownViewer markdownText={content}></MarkdownViewer>
        </Row>
        <Row type="flex" style={{ justifyContent: "flex-end" }}>
          <PlayModeControls level_name={level_name} />
        </Row>
      </Col>
    </SplitterLayout>
  );
}

export default MarkdownEditor;

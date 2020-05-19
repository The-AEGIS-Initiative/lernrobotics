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

function MarkdownEditor({ handleChange }) {
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
      <CodeEditor
        mode="markdown"
        handleChange={(e) => {
          setContent(e);
          handleChange(e);
        }}
      />
      <MarkdownViewer markdownText={content}></MarkdownViewer>
    </SplitterLayout>
  );
}

export default MarkdownEditor;

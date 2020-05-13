import React, { useContext, useRef, useState, useEffect } from "react";

import { Row, Col, Button } from "antd";
import styles from "../style_modules/button.module.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import { useHotkeys } from "react-hotkeys-hook";

import { postData, getData } from "../components/HttpController";
import { submitUserCode, stopUserCode } from "../sockets/emit";

/**
 * Component for the text editor.
 *
 * @component
 */

function CodeEditor({ level_name, mode, handleChange }) {
  const editorRef = useRef();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchDefaultCode();
  }, [fetchDefaultCode, level_name]); // Re-render on authentication status change

  // Capture Ctrl+S from editor to prevent annoying pop-ups
  useEffect(() => {
    if (editorRef.current) {
      // Prevent null referene errors
      editorRef.current.editor.commands.addCommand({
        name: "save",
        bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
        exec: function (editor) {
          console.log("captured ctrl+s from editor");
        },
      });
    }
  }, [editorRef]); // Run when editorRef is assigned

  // Fetch default code from public/default_code/*.py
  const fetchDefaultCode = () => {
    fetch(`/default_code/${level_name}.py`)
      .then((response) => response.text())
      .then((text) => {
        setContent(text);
        handleChange(text);
      });
  };

  // Update code editor content
  const onChange = (newValue) => {
    setContent(newValue);
    handleChange(newValue);
  };

  return (
    <AceEditor
      ref={editorRef}
      mode={mode}
      theme="monokai"
      onChange={onChange}
      value={content}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      showPrintMargin={false}
      height="91vh"
      width="100%"
      fontSize="16px"
      style={{ zIndex: 0 }}
    />
  );
}

export default CodeEditor;

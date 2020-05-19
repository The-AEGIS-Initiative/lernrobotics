import React, { useContext, useRef, useState, useEffect } from "react";

import { Row, Col, Button } from "antd";
import styles from "../style_modules/button.module.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "./code_editor.css";

import { useHotkeys } from "react-hotkeys-hook";

import { postData, getData } from "../components/HttpController";
import { submitUserCode, stopUserCode } from "../sockets/emit";

/**
 * Code editor
 */

function CodeEditor({ mode, placeholder, handleChange }) {
  const editorRef = useRef();

  const [content, setContent] = useState(placeholder);

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

  useEffect(() => {
    setContent(placeholder);
  }, [placeholder]);

  return (
    <div
      style={{
        display: "flex",
        height: "auto",
        width: "100%",
      }}
    >
      <AceEditor
        ref={editorRef}
        mode={mode}
        theme="monokai"
        onChange={(value) => {
          handleChange(value);
          setContent(value);
        }}
        value={content}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        fontSize="16px"
        style={{ zIndex: 0 }}
      />
    </div>
  );
}

export default CodeEditor;

import React, { useContext, useRef, useState, useEffect } from "react";

import { Row, Col, Button } from "antd";
import styles from "../style_modules/button.module.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import { useHotkeys } from "react-hotkeys-hook";

import { postData, getData } from "../components/HttpController";
import { submitUserCode, stopUserCode } from "../sockets/emit";
import { GamePageContext } from "../contexts/GamePageContext";
import { AppContext } from "../contexts/AppContext";

/**
 * Component for the text editor.
 *
 * @component
 */

function EditorSection({ level }) {
  // creating the Editor class
  const appContext = useContext(AppContext);
  const gamePageContext = useContext(GamePageContext);

  const editorRef = useRef();
  const [content, setContent] = useState("");

  useEffect(() => {
    // If user is authenticated
    if (appContext.isAuth) {
      getData(
        `${appContext.backEndURL}/user/code/${appContext.username}/${level}`,
        (res) => {
          console.log(res);
          const jsonData = res.json().then((jsonData) => {
            if (jsonData.code == "") {
              // If user has no saved progress, use default code
              fetchDefaultCode();
            } else {
              // Use saved progress
              setContent(jsonData.code);
            }
          });
        }
      );
    } else {
      // If user is not logged in
      fetchDefaultCode();
    }
  }, [appContext.isAuth, level]); // Re-render on authentication status change

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
    fetch(`/default_code/${level}.py`)
      .then((response) => response.text())
      .then((text) => {
        setContent(text);
        gamePageContext.setEditorContent(text);
      });
  };

  // Update code editor content
  const onChange = (newValue) => {
    setContent(newValue);
    gamePageContext.setEditorContent(newValue);
  };

  return (
    <AceEditor
      ref={editorRef}
      mode="python"
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

export default EditorSection;

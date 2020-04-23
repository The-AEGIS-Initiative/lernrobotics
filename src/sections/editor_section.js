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

function EditorSection({ level, width }) {
  // creating the Editor class
  const appContext = useContext(AppContext);
  const gamePageContext = useContext(GamePageContext);

  const editorRef = useRef();
  const [content, setContent] = useState("");

  useEffect(() => {
    // If user is authenticated
    console.log("editor width", width);
    if (appContext.isAuth) {
      getData(
        `${process.env.REACT_APP_BACKEND_URL}/user/code/${level}`,
        (res) => {
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
  }, [appContext.isAuth, fetchDefaultCode, level, width]); // Re-render on authentication status change

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
      });
  };

  // Update code editor content
  const onChange = (newValue) => {
    setContent(newValue);
  };

  // POST user code to database
  const pushUserCode = () => {
    if (appContext.isAuth) {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/user/code`;
      const data = { level: level, code: content };
      postData(endpoint, data, () => {});
    }
  };

  return (
    <div>
      <Col style={{ width: { width } }}>
        <Row>
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
            width={width}
            fontSize="16px"
            style={{ zIndex: 0 }}
          />
        </Row>

        <Row type="flex" style={{ justifyContent: "flex-end" }}>
          <Button
            type="primary"
            style_module={styles.submit}
            style={{
              backgroundColor: "#575757",
              borderColor: "#575757",
            }}
            loading={gamePageContext.isLoading}
            onClick={() => {
              stopUserCode();
            }}
          >
            Stop
          </Button>
          <Button
            type="primary"
            style_module={styles.submit}
            style={{ backgroundColor: "#575757", borderColor: "#575757" }}
            loading={gamePageContext.isLoading}
            onClick={() => {
              submitUserCode(editorRef.current.editor.getValue());
              pushUserCode();
            }}
          >
            Submit
          </Button>
        </Row>
      </Col>
    </div>
  );
}

export default EditorSection;

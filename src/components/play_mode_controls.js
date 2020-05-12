import React, { useContext } from "react";

import { Row, Col, Button } from "antd";
import styles from "../style_modules/button.module.css";

import { postData, getData } from "../components/HttpController";
import { submitUserCode, stopUserCode } from "../sockets/emit";
import { GamePageContext } from "../contexts/GamePageContext";
import { AppContext } from "../contexts/AppContext";

/**
 * Component for the text editor.
 *
 * @component
 */

function PlayModeControls({ editor_content, level_name }) {
  // creating the Editor class
  const appContext = useContext(AppContext);
  const gamePageContext = useContext(GamePageContext);

  // POST user code to database
  const pushUserCode = () => {
    if (appContext.isAuth) {
      console.log(`Pushing user code to ${appContext.backEndURL}/user/code`);
      const endpoint = `${appContext.backEndURL}/user/code`;
      const data = {
        username: appContext.username,
        level_name: level_name,
        code: editor_content,
      };
      postData(endpoint, data, () => {});
    }
  };

  return (
    <div type="flex" style={{ justifyContent: "flex-end" }}>
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
          submitUserCode(gamePageContext.editorContent);
        }}
      >
        Submit
      </Button>
    </div>
  );
}

export default PlayModeControls;

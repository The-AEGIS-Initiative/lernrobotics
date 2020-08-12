import React, { useRef, useState, useEffect } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/theme-github";
import "brace/snippets/python";
import "brace/ext/language_tools";

/**
 * Code editor
 */

function CodeEditor({ mode, placeholder, handleChange, isLoading }) {
  const editorRef = useRef();

  const [content, setContent] = useState(placeholder);

  // Capture Ctrl+S from editor to prevent annoying pop-ups
  useEffect(() => {
    if (editorRef.current) {
      // Prevent null referene errors
      editorRef.current.editor.commands.addCommand({
        name: "save",
        bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
        exec(editor) {
          console.log("captured ctrl+s from editor");
        },
      });

      // Fill container
      editorRef.current.editor.resize();
    }
  }, [editorRef]); // Run when editorRef is assigned

  useEffect(() => {
    setContent(placeholder);
  }, [placeholder]);

  useEffect(() => {
    editorRef.current.editor.resize();
  }, [isLoading]);

  return (
    <div
      style={{
        display: "flex",
        height: "auto",
        width: "100%",
      }}
      id="editor-container"
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
        name="editor-container"
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        fontSize="16px"
        style={{ zIndex: 0, height: "100%", width: "100%" }}
        enableLiveAutocompletion
      />
    </div>
  );
}

export default CodeEditor;

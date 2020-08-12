import React, { useState } from "react";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import SplitterLayout from "react-splitter-layout";
import MarkdownViewer from "../markdown_viewer";
import CodeEditor from "../code_editor";

/**
 * Split-view markdown editor
 */

function MarkdownEditor({ handleChange, placeholder, mode }) {
  const [content, setContent] = useState(placeholder);
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
        mode={mode}
        placeholder={placeholder}
        handleChange={(e) => {
          setContent(e);
          handleChange(e);
        }}
      />
      <MarkdownViewer markdownText={content} />
    </SplitterLayout>
  );
}

export default MarkdownEditor;

import React, { useEffect, useState } from "react";
import { Button } from "antd";
import MarkdownEditor from "../components/markdown_editor";
import styles from "../style.module.css";
import * as graphqlController from "../graphql/graphql-controller";

export default function DocumentEditorPage({ docName }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch level data
      console.log(docName);
      const data = await graphqlController.getDoc({
        doc_name: docName,
      });
      console.log(data);

      if (data.length == 0) {
        setContent("");
        console.log("New document!");
      } else {
        // Set task, tutorial, and levelData content
        setContent(data[0].doc_content);
      }
    }

    fetchData();
  }, []);

  const publishDocument = async () => {
    const res = await graphqlController.upsertDoc({
      doc_name: docName,
      doc_content: content,
    });
    console.log(res);
  };

  if (content == null) {
    return null;
  } else {
    return (
      <div style={{ backgroundColor: "#333333" }}>
        <MarkdownEditor
          placeholder={content}
          handleChange={(e) => setContent(e)}
        />
        <Button onClick={publishDocument} className={styles.buttons}>
          Publish Document
        </Button>
      </div>
    );
  }
}

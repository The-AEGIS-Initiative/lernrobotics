import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

import MarkdownEditor from 'components/markdown_editor'
import styles from 'style.module.css'
import * as graphqlController from 'graphql/graphql-controller'

export default function DocumentEditorPage ({ docName }) {
  const [content, setContent] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // Tracks whether code is currently being submitted
  const [mode, setMode] = useState('markdown')

  useEffect(() => {
    async function fetchData () {
      // Fetch level data
      console.log(docName)
      const data = await graphqlController.getDoc({
        doc_name: docName
      })
      console.log(data)

      if (data.length == 0) {
        setContent('')
        console.log('New document!')
      } else {
        // Set task, tutorial, and levelData content
        setContent(data[0].doc_content)
      }
    }

    fetchData()
  }, [])

  const publishDocument = async () => {
    // Syntax check JSON files
    // ContentSchema errors will instantly break website. Hardcode a syntax check.
    if (mode == 'json' || docName == 'ContentSchema') {
      try {
        JSON.parse(content)
      } catch (e) {
        console.log(e)
        return
      }
    }
    setIsSubmitting(true)
    const res = await graphqlController.upsertDoc({
      doc_name: docName,
      doc_content: content
    })
    setIsSubmitting(false)
    console.log(res)
  }

  if (content == null) {
    return null
  } else {
    return (
      <div style={{ backgroundColor: '#333333' }}>
        <Button
          onClick={() => {
            setMode('markdown')
          }}
          className={`${styles.ui_font} ${styles.dark_buttons}`}
        >
          Markdown mode
        </Button>
        <Button
          onClick={() => {
            setMode('json')
          }}
          className={`${styles.ui_font} ${styles.dark_buttons}`}
        >
          JSON mode
        </Button>
        <MarkdownEditor
          mode={mode}
          placeholder={content}
          handleChange={(e) => setContent(e)}
        />
        <Button
          loading={isSubmitting}
          onClick={() => {
            publishDocument()
          }}
          className={`${styles.ui_font} ${styles.dark_buttons}`}
        >
          Publish Document
        </Button>
      </div>
    )
  }
}

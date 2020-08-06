import React, { useEffect, useState, useContext, useRef } from 'react'
import { FixedSizeList } from 'react-window'
import { GamePageContext } from 'contexts/GamePageContext'

import styles from 'style.module.css'

function Console ({ height, width, unityContent }) {
  const gamePageContext = useContext(GamePageContext)
  const [logs, setLogs] = useState([])
  const parent = useRef(null)

  useEffect(() => {
    unityContent.on('ConsoleLog', (log) => {
      console.log(logs)
      setLogs([...logs, ...log.split('\n')])
    })
  }, [logs])

  useEffect(() => {
    unityContent.on('Start', () => {
      setLogs([])
    })
  }, [])

  function Row ({ index, style }) {
    console.log(index)
    return <div style={style}> {logs[index]} </div>
  }

  return (
    <div style={{ height: '100%', width: '100%' }} ref={parent}>
      <button
        style={{ position: 'absolute', margin: 0, right: 0, zIndex: '1' }}
        className={`${styles.ui_font} ${styles.dark_buttons}`}
        onClick={() => setLogs([])}
      >
        Clear
      </button>

      <div
        className="console"
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'black'
        }}
      >
        {parent.current != null && (
          <FixedSizeList
            className="console-logs"
            height={parent.current.offsetHeight}
            itemCount={logs.length}
            itemSize={25}
            width={parent.current.offsetWidth}
          >
            {Row}
          </FixedSizeList>
        )}
      </div>
    </div>
  )
}

// Filter logs so user is not floaded with useless information
const filter = (log) => {
  if (log == null) {
    return ''
  }
  // Remove line: "(Filename: ./Runtime/Export/Debug/Debug.bindings.h Line: 35)"
  var pattern = /\n\s\n*\(.*\)/
  log = log.replace(pattern, '')

  // Remove "[UnityCache]" logs
  pattern = /\[UnityCache\].*/
  log = log.replace(pattern, '')

  // Remove "WS error: WebSocket error"
  pattern = /WS error: WebSocket error/
  log = log.replace(pattern, '')

  // Remove "Unloading ? unused Assets to reduce memory usage"
  pattern = /Unloading \d unused Assets to reduce memory usage/
  log = log.replace(pattern, '')

  // Remove "Unloading ? Unused Serialized files (Serialized files now loaded: ?)"
  pattern = /Unloading \d Unused Serialized files \(Serialized files now loaded: \d\)/
  log = log.replace(pattern, '')

  return log.trim()
}

export default Console

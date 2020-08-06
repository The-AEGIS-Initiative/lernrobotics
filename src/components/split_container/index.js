import React from 'react'

import { Row, Col } from 'antd'

/**
 * leftSize takes in an int between 1 and 24.
 * 	- 24 = 100% width, 12 = 50% width, etc...
 * 	- See ant design grid layout for more details
 */
function SplitContainer ({ children, leftSize }) {
  return (
    <Row className="split-container">
      <Col
        span={leftSize}
        className="left-col"
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {children[0]}
      </Col>
      <Col
        span={24 - leftSize}
        className="right-col"
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {children[1]}
      </Col>
    </Row>
  )
}

export default SplitContainer

import React from 'react'
import { Card, Button } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'

import { Link } from 'react-router-dom'

import './index.css'
import styles from 'style.module.css'

const { Meta } = Card

function LevelCard ({ title, description, link, difficulty, stars }) {
  return (
    <div className="level-card" data-cy="level-card">
      <Link to={link}>
        <Card
          style={{
            width: '600px',
            height: '175px'
          }}
        >
          <Meta title={title} description={description} />
          <div className="level-card-row" data-cy="level-start-button">
            {/** <Button
              className={`${styles.ui_font} button`}
              data-cy="level-start-button"
            >
              <Link to={link}>Start</Link>
            </Button> */}

            <div className="level-card-completion">
              {Array.from(Array(3 - stars)).map(() => (
                <StarOutlined />
              ))}
              {Array.from(Array(stars)).map(() => (
                <StarFilled />
              ))}
            </div>
            <div className="level-card-difficulty">
              Difficulty: <strong>{difficulty}</strong>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}

export default LevelCard

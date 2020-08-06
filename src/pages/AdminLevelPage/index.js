import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Input } from 'antd'
import * as graphqlController from 'graphql/graphql-controller'

async function changeLevelName (value, level) {
  // TODO : probably add a warning modal or some other form of authentication here

  await graphqlController.updateLevel({
    id: level.id,
    level_name: value,
    creator: level.creator,
    default_code: level.default_code,
    task: level.task,
    tutorial: level.tutorial,
    level_data: level.level_data
  })
  window.location.reload()
}

function AdminLevelPage ({ levelID }) {
  const [level, setLevel] = useState('')

  const { Search } = Input
  useEffect(() => {
    async function get_data () {
      var jsonObject = await graphqlController.getLevelByID({ id: levelID })

      setLevel(jsonObject)
    }

    get_data()
  }, [])

  // TODO : styles.css for admin pages

  return (
    <>
      <h1> Level Management Page: {level.level_name}</h1>
      <h2> Edit Level Name: </h2>
      <p>
        Temporarily disabled name change because it will desync the way levels
        are loaded in HomePage currently
      </p>
      {/** <Search
        placeholder={"Enter new name for level"}
        onSearch={async (value) => {
          //await changeLevelName(value, level);
        }}
        enterButton="Change Name"
      /> */}
      <h2> Level Builder:</h2>
      <Link to={`/admin/levelbuilder/${level.level_name}`}>
        {' '}
        {level.level_name}{' '}
      </Link>
    </>
  )
}

export default AdminLevelPage

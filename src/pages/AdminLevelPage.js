import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "antd";
import * as graphqlController from "../graphql/graphql-controller";

function AdminLevelPage({ levelID }) {
  const [level, setLevel] = useState("");

  const { Search } = Input;
  useEffect(() => {
    async function get_data() {
      var jsonObject = await graphqlController.getLevelByID({ id: levelID });

      setLevel(jsonObject);
    }

    get_data();
  }, []);
  console.log(level);

  // TODO : styles.css for admin pages

  return (
    <>
      <h1> Level Management Page: {level.level_name}</h1>
      <h2> Edit Level Name: </h2>
      <Search
        placeholder={"Enter new name for level"}
        onSearch={(value) =>
          // TODO : change name
          //history.push(`/admin/markdowneditor/${value}`)
          console.log("test")
        }
        enterButton="Change Name"
      />
      <h2> Level Builder:</h2>
      <Link to={`/admin/levelbuilder/${level.level_name}`}>
        {" "}
        {level.level_name}{" "}
      </Link>
    </>
  );
}

export default AdminLevelPage;

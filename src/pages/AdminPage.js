import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "antd";
import LevelList from "../components/level_list";
import * as graphqlController from "../graphql/graphql-controller";

function AdminPage() {
  const [levelList, setLevelList] = useState([]);
  const [documents, setDocuments] = useState([]);

  const history = useHistory(); // history hook

  const { Search } = Input;

  // async lambda here to pull the level list
  useEffect(() => {
    async function get_data() {
      var jsonObject = await graphqlController.listLevels();
      console.log(jsonObject);
      setLevelList(jsonObject);

      setDocuments(await graphqlController.listDocs());
    }

    get_data();
  }, []);

  return (
    <div>
      <h1> Welcome to the Admin page! </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <div>
          <h2> Game Content </h2>
          <div style={{ marginBottom: "20px" }}>
            <Search
              placeholder={"level name (no spaces)"}
              onSearch={(value) => history.push(`/admin/levelbuilder/${value}`)}
              enterButton="Create Level"
            />
          </div>
          <h3> Levels List </h3>
          <LevelList
            level_list={levelList}
            renderItem={(item) => ({
              title: item.id,
              description: (
                <Link to={`/admin/level/${item.id}`}> {item.level_name} </Link>
              ),
            })}
          />
        </div>
        <div style={{ marginLeft: "50px" }}>
          <h2> Documents </h2>

          <div style={{ marginBottom: "20px" }}>
            <Search
              placeholder={"Enter name for new document"}
              onSearch={(value) => history.push(`/admin/editor/${value}`)}
              enterButton="Create Document"
            />
          </div>

          <h3> Documents List </h3>
          <LevelList
            level_list={documents}
            renderItem={(item) => ({
              title: item.id,
              description: (
                <Link to={`/admin/editor/${item.doc_name}`}>
                  {" "}
                  {item.doc_name}{" "}
                </Link>
              ),
            })}
          />
        </div>
      </div>
    </div>
  );
}
//onclick: link to intermediate page w features, then to the level builder page
export default AdminPage;

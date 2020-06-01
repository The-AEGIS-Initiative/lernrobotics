import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import LevelList from "../components/level_list";
import * as graphqlController from "../graphql/graphql-controller";

function AdminPage() {
  const [llist, setLlist] = useState([]);

  // async lambda here to pull the level list
  useEffect(() => {
    async function get_list() {
      var jsonObject = await graphqlController.listLevels();
      console.log(jsonObject);
      setLlist(jsonObject);
    }
    get_list();
  }, []);

  return (
    <div>
      <h1> Welcome to the Admin page! </h1>
      <Link to="/admin/levelbuilder/test_level"> Level Builder </Link>
      <h2> Editor List: </h2>
      <LevelList level_list={llist}></LevelList>
    </div>
  );
}
//onclick: link to intermediate page w features, then to the level builder page
export default AdminPage;

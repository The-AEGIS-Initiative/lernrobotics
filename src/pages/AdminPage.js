import React from "react";
import { Link } from "react-router-dom";
import LevelList from "../components/level_list";
import * as graphqlController from "../graphql/graphql-controller";

function AdminPage() {
  // async lambda here to pull the level list
  const level_list = async () => {
    var jsonObject = await graphqlController.listLevels();
    console.log(jsonObject);
  };
  return (
    <div>
      <h1> Welcome to the Admin page! </h1>
      <Link to="/admin/levelbuilder/test_level"> Level Builder </Link>
      <LevelList>level_list = {level_list}</LevelList>
    </div>
  );
}
//onclick: link to intermediate page w features, then to the level builder page
export default AdminPage;

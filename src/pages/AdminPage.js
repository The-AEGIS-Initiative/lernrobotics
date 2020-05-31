import React from "react";
import { Link } from "react-router-dom";
import LevelList from "../components/level_list";


function AdminPage() {
  return (
    <div>
      <h1> Welcome to the Admin page! </h1>
      <Link to="/admin/levelbuilder/test_level"> Level Builder </Link>
      <LevelList/>
    </div>
  );
}

export default AdminPage;

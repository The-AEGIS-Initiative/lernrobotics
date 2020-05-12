import React from "react";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div>
      <h1> Welcome to the Admin page! </h1>
      <Link to="/admin/levelbuilder"> Level Builder </Link>
    </div>
  );
}

export default AdminPage;

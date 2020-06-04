import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "antd";
import * as graphqlController from "../graphql/graphql-controller";

function AdminLevelPage({ levelID }) {
    const [level, setLevel] = useState("");
    useEffect(() => {
        async function get_data() {
          var jsonObject = await graphqlController.getLevelByID({id: levelID});
          // console.log(jsonObject);
          setLevel(jsonObject);
        }
    
        get_data();
      }, []);
      console.log(level);
      return(
            <h1> Level Management Page: `{level.level_name}`</h1>
        );



}

export default AdminLevelPage;
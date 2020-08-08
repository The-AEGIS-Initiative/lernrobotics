import React from "react";
import { List, Card } from "antd";

// TODO : onclick
// renderItem takes in item and returns {title: "", description: ""}
function LevelList({ onClick, level_list, renderItem }) {
  console.log(level_list);
  // var level_list = await graphqlController.listLevels();
  console.log("started level list");
  return (
    <div className="grid-list">
      <List
        itemLayout="horizontal"
        dataSource={level_list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta {...renderItem(item)} />
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default LevelList;

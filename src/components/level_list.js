import React from "react";
import { List, Card } from "antd";

// TODO : onclick

function LevelList({ onClick, level_list }) {
  console.log(level_list);
  //var level_list = await graphqlController.listLevels();
  console.log("started level list");
  return (
    <div className="grid-list">
      <List
        itemLayout="horizontal"
        dataSource={level_list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.id}
              description={<a href="https://ant.design">{item.level_name}</a>}
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default LevelList;

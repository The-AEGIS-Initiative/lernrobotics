import React from "react";
import { List, Card } from "antd";

// TODO : onclick

function LevelList({ onClick, level_list }) {
  //var level_list = await graphqlController.listLevels();
  console.log("started level list");
  return (
    <div className="grid-list">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={level_list}
        renderItem={(item) => (
          <List.Item>
            <Card title={item[0].level_name}>TODO: onClick link here</Card>
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default LevelList;

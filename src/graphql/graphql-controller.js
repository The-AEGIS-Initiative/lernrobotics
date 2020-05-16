import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./mutations";
import * as queries from "./queries";

// Create new user progress
export const createProgress = async ({ level_name, user_code }) => {
  const data = await API.graphql(
    graphqlOperation(mutations.createProgress, {
      input: { level_name: level_name, user_code: user_code, stars: 0 },
    })
  );
};

// Update or create user progress if does not exist
export const upsertProgress = async ({ level_name, user_code }) => {
  const currentProgress = await getProgress({
    level_name: level_name,
  });

  if (currentProgress.length == 0) {
    // Create progress
    console.log("Creating now progress");
    await createProgress({
      level_name: level_name,
      user_code: user_code,
      stars: 0,
    });
  } else {
    // Update progress
    console.log("Updating existing progress");
    const id = currentProgress[0].id;
    await updateProgress({
      id: currentProgress[0].id,
      user_code: user_code,
      level_name: currentProgress[0].level_name,
      stars: currentProgress[0].stars,
    });
  }
};

// Update user progress
export const updateProgress = async ({ id, level_name, user_code, stars }) => {
  const data = await API.graphql(
    graphqlOperation(mutations.updateProgress, {
      input: { id: id, user_code: user_code },
    })
  );
};

// Get current progress
export const getProgress = async ({ level_name }) => {
  const data = await API.graphql(
    graphqlOperation(queries.progressByLevelName, { level_name: level_name })
  );

  const dataByDate = data.data.progressByLevelName.items.sort((e1, e2) => {
    return Date.parse(e2.createdAt) - Date.parse(e1.createdAt);
  });

  return dataByDate;
};

// Get level data
export const getLevel = async ({ level_name }) => {
  const data = await API.graphql(
    graphqlOperation(queries.getLevelByName, { level_name: level_name })
  );
  const levelData = data.data.getLevelByName.items;
  return levelData;
};

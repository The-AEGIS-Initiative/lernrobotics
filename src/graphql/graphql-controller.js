import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./mutations";
import * as queries from "./queries";

export const createProgress = async ({ username, level_name, user_code }) => {
  const data = await API.graphql(
    graphqlOperation(mutations.createProgress, {
      input: { level_name: level_name, user_code: user_code, stars: 0 },
    })
  );
};

export const upsertProgress = async ({ username, level_name, user_code }) => {
  const currentProgress = await getProgress({
    username: username,
    level_name: level_name,
  });

  console.log(currentProgress);
  if (currentProgress.length == 0) {
    // Create progress
    console.log("Creating now progress");
    await createProgress({
      username: username,
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

export const updateProgress = async ({
  id,
  username,
  level_name,
  user_code,
  stars,
}) => {
  const data = await API.graphql(
    graphqlOperation(mutations.updateProgress, {
      input: { id: id, user_code: user_code },
    })
  );
};

export const getProgress = async ({ username, level_name }) => {
  const data = await API.graphql(
    graphqlOperation(queries.progressByLevelName, { level_name: level_name })
  );

  const dataByDate = data.data.progressByLevelName.items.sort((e1, e2) => {
    return Date.parse(e2.createdAt) - Date.parse(e1.createdAt);
  });

  return dataByDate;
};

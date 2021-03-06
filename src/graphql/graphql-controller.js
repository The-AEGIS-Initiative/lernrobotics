import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./mutations";
import * as queries from "./queries";

// Create new user progress
export const createProgress = async ({
  level_name,
  user_code,
  default_code,
}) => {
  const data = await API.graphql(
    graphqlOperation(mutations.createProgress, {
      input: {
        level_name,
        user_code,
        stars: 0,
        default_code,
      },
    })
  );
};

// Update or create user progress if does not exist
export const upsertProgress = async ({
  level_name,
  user_code,
  default_code,
  stars,
}) => {
  const currentProgress = await getProgress({
    level_name,
  });

  if (currentProgress.length == 0) {
    // Create progress
    console.log("Creating now progress");
    await createProgress({
      level_name,
      user_code,
      stars,
      default_code,
    });
  } else {
    // Update progress
    console.log("Updating existing progress");
    const { id } = currentProgress[0];
    await updateProgress({
      id: currentProgress[0].id,
      user_code,
      level_name: currentProgress[0].level_name,
      stars,
      default_code,
    });
  }
};

// Update user progress
export const updateProgress = async ({
  id,
  level_name,
  user_code,
  stars,
  default_code,
}) => {
  const data = await API.graphql(
    graphqlOperation(mutations.updateProgress, {
      input: {
        id,
        user_code,
        default_code,
        stars,
      },
    })
  );

  console.log(data);
};

// Get current progress
export const getProgress = async ({ level_name }) => {
  const data = await API.graphql(
    graphqlOperation(queries.progressByLevelName, { level_name })
  );

  const dataByDate = data.data.progressByLevelName.items.sort(
    (e1, e2) => Date.parse(e2.createdAt) - Date.parse(e1.createdAt)
  );

  return dataByDate;
};

// List all progress
export const listProgress = async () => {
  const data = await API.graphql(graphqlOperation(queries.listProgresss));

  console.log(data.data.listProgresss.items);
  return data.data.listProgresss.items;
};

// Create level
export const createLevel = async ({
  level_name,
  creator,
  default_code,
  task,
  tutorial,
  level_data,
}) => {
  const data = await API.graphql(
    graphqlOperation(mutations.createLevel, {
      input: {
        level_name,
        default_code,
        task,
        creator,
        tutorial,
        level_data,
      },
    })
  );
};

// Create published level
export const createPublishedLevel = async ({
  level_name,
  creator,
  default_code,
  task,
  tutorial,
  level_data,
}) => {
  const data = await API.graphql(
    graphqlOperation(mutations.createPublishedLevel, {
      input: {
        level_name,
        creator,
        default_code,
        task,
        tutorial,
        level_data,
      },
    })
  );
};

// List all levels
export const listLevels = async () => {
  const data = await API.graphql(graphqlOperation(queries.listLevels));

  const levelData = data.data.listLevels.items;
  return levelData;
};

// Get level data
export const getLevel = async ({ level_name }) => {
  const data = await API.graphql(
    graphqlOperation(queries.getLevelByName, { level_name })
  );

  const levelData = data.data.getLevelByName.items;

  return levelData;
};

// Get Level data using API_KEY auth
export const getLevelAsGuest = async ({ level_name }) => {
  const data = await API.graphql({
    query: queries.getPublishedLevelByName,
    variables: { level_name },
    authMode: "API_KEY",
  });

  return data.data.getPublishedLevelByName.items;
};

// Get level data
export const getLevelByID = async ({ id }) => {
  const data = await API.graphql(graphqlOperation(queries.getLevel, { id }));
  const levelData = data.data.getLevel;

  return levelData;
};

// Get published level data
export const getPublishedLevel = async ({ level_name }) => {
  const data = await API.graphql(
    graphqlOperation(queries.getPublishedLevelByName, {
      level_name,
    })
  );

  const levelData = data.data.getPublishedLevelByName.items;

  return levelData;
};

// Update level data
export const updateLevel = async ({
  id,
  level_name,
  creator,
  default_code,
  task,
  tutorial,
  level_data,
}) => {
  console.log({
    id,
    level_name,
    creator,
    default_code,
    task,
    tutorial,
    level_data,
  });
  const data = await API.graphql(
    graphqlOperation(mutations.updateLevel, {
      input: {
        id,
        level_name,
        default_code,
        task,
        creator,
        tutorial,
        level_data,
      },
    })
  );
};

// Update level data
export const updatePublishedLevel = async ({
  id,
  level_name,
  creator,
  default_code,
  task,
  tutorial,
  level_data,
}) => {
  const data = await API.graphql(
    graphqlOperation(mutations.updatePublishedLevel, {
      input: {
        id,
        level_name,
        default_code,
        task,
        creator,
        tutorial,
        level_data,
      },
    })
  );
};

// Usert level data
export const upsertLevel = async ({
  level_name,
  creator,
  default_code,
  task,
  tutorial,
  level_data,
}) => {
  const level = await getLevel({ level_name });

  if (level.length == 0) {
    // No existing level data
    await createLevel({
      level_name,
      creator,
      default_code,
      task,
      tutorial,
      level_data,
    });
  } else {
    await updateLevel({
      id: level[0].id,
      level_name,
      creator: level[0].creator,
      default_code,
      task,
      tutorial,
      level_data,
    });
  }
};

// Usert published level data
export const upsertPublishedLevel = async ({
  level_name,
  creator,
  default_code,
  task,
  tutorial,
  level_data,
}) => {
  const level = await getPublishedLevel({ level_name });

  if (level.length == 0) {
    // No existing level data
    await createPublishedLevel({
      level_name,
      creator,
      default_code,
      task,
      tutorial,
      level_data,
    });
  } else {
    await updatePublishedLevel({
      id: level[0].id,
      level_name,
      creator: level[0].creator,
      default_code,
      task,
      tutorial,
      level_data,
    });
  }
};

export const createSubmission = async ({ level_name, username, score }) => {
  const submission = await API.graphql(
    graphqlOperation(mutations.createSubmissions, {
      input: {
        level_name,
        username,
        score,
      },
    })
  );

  return submission;
};

export const getUserSubmission = async ({ level_name, username }) => {
  const submission = await API.graphql(
    graphqlOperation(queries.getLevelSubmissions, {
      level_name,
      filter: { username: { eq: username } },
    })
  );
  return submission.data.getLevelSubmissions.items;
};

export const getLevelSubmissions = async ({ level_name }) => {
  const submission = await API.graphql(
    graphqlOperation(queries.getLevelSubmissions, {
      level_name,
    })
  );
  return submission.data.getLevelSubmissions.items;
};

export const updateUserSubmission = async ({ submission_id, score }) => {
  const response = await API.graphql(
    graphqlOperation(mutations.updateSubmissions, {
      input: {
        id: submission_id,
        score,
      },
    })
  );
  return response;
};

export const getDoc = async ({ doc_name }) => {
  const response = await API.graphql(
    graphqlOperation(queries.getDocByName, {
      doc_name,
    })
  );

  return response.data.getDocByName.items;
};

export const getDocAsGuest = async ({ doc_name }) => {
  const data = await API.graphql({
    query: queries.getDocByName,
    variables: { doc_name },
    authMode: "API_KEY",
  });

  return data.data.getDocByName.items;
};

export const updateDoc = async ({ doc_id, doc_name, doc_content }) => {
  const response = await API.graphql(
    graphqlOperation(mutations.updateMarkdownDocs, {
      input: {
        id: doc_id,
        doc_name,
        doc_content,
      },
    })
  );

  return response;
};

export const createDoc = async ({ doc_name, doc_content }) => {
  const response = await API.graphql(
    graphqlOperation(mutations.createMarkdownDocs, {
      input: {
        doc_name,
        doc_content,
      },
    })
  );

  return response;
};

export const upsertDoc = async ({ doc_name, doc_content }) => {
  const cur_docs = await getDoc({
    doc_name,
  });

  if (cur_docs.length == 0) {
    // Create new document
    return await createDoc({
      doc_name,
      doc_content,
    });
  }
  return await updateDoc({
    doc_id: cur_docs[0].id,
    doc_name,
    doc_content,
  });
};

export const listDocs = async () => {
  const response = await API.graphql(
    graphqlOperation(queries.listMarkdownDocss)
  );

  return response.data.listMarkdownDocss.items;
};

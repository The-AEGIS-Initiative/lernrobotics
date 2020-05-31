/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProgress = /* GraphQL */ `
  subscription OnCreateProgress($owner: String!) {
    onCreateProgress(owner: $owner) {
      id
      createdAt
      level_name
      user_code
      stars
      owner
    }
  }
`;
export const onUpdateProgress = /* GraphQL */ `
  subscription OnUpdateProgress($owner: String!) {
    onUpdateProgress(owner: $owner) {
      id
      createdAt
      level_name
      user_code
      stars
      owner
    }
  }
`;
export const onDeleteProgress = /* GraphQL */ `
  subscription OnDeleteProgress($owner: String!) {
    onDeleteProgress(owner: $owner) {
      id
      createdAt
      level_name
      user_code
      stars
      owner
    }
  }
`;
export const onCreateLevel = /* GraphQL */ `
  subscription OnCreateLevel($owner: String) {
    onCreateLevel(owner: $owner) {
      id
      level_name
      creator
      default_code
      task
      tutorial
      level_data
      owner
    }
  }
`;
export const onUpdateLevel = /* GraphQL */ `
  subscription OnUpdateLevel($owner: String) {
    onUpdateLevel(owner: $owner) {
      id
      level_name
      creator
      default_code
      task
      tutorial
      level_data
      owner
    }
  }
`;
export const onDeleteLevel = /* GraphQL */ `
  subscription OnDeleteLevel($owner: String) {
    onDeleteLevel(owner: $owner) {
      id
      level_name
      creator
      default_code
      task
      tutorial
      level_data
      owner
    }
  }
`;
export const onCreatePublishedLevel = /* GraphQL */ `
  subscription OnCreatePublishedLevel($owner: String) {
    onCreatePublishedLevel(owner: $owner) {
      id
      level_name
      creator
      default_code
      task
      tutorial
      level_data
      owner
    }
  }
`;
export const onUpdatePublishedLevel = /* GraphQL */ `
  subscription OnUpdatePublishedLevel($owner: String) {
    onUpdatePublishedLevel(owner: $owner) {
      id
      level_name
      creator
      default_code
      task
      tutorial
      level_data
      owner
    }
  }
`;
export const onDeletePublishedLevel = /* GraphQL */ `
  subscription OnDeletePublishedLevel($owner: String) {
    onDeletePublishedLevel(owner: $owner) {
      id
      level_name
      creator
      default_code
      task
      tutorial
      level_data
      owner
    }
  }
`;
export const onCreateSubmission = /* GraphQL */ `
  subscription OnCreateSubmission {
    onCreateSubmission {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const onUpdateSubmission = /* GraphQL */ `
  subscription OnUpdateSubmission {
    onUpdateSubmission {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const onDeleteSubmission = /* GraphQL */ `
  subscription OnDeleteSubmission {
    onDeleteSubmission {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;

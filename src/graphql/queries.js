/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProgress = /* GraphQL */ `
  query GetProgress($id: ID!) {
    getProgress(id: $id) {
      id
      createdAt
      level_name
      user_code
      stars
      owner
    }
  }
`;
export const listProgresss = /* GraphQL */ `
  query ListProgresss(
    $filter: ModelProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        level_name
        user_code
        stars
        owner
      }
      nextToken
    }
  }
`;
export const getSubmission = /* GraphQL */ `
  query GetSubmission($id: ID!) {
    getSubmission(id: $id) {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const listSubmissions = /* GraphQL */ `
  query ListSubmissions(
    $filter: ModelSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubmissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        score
        level_name
        createdAt
      }
      nextToken
    }
  }
`;
export const progressByLevelName = /* GraphQL */ `
  query ProgressByLevelName(
    $level_name: String
    $sortDirection: ModelSortDirection
    $filter: ModelProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    progressByLevelName(
      level_name: $level_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        level_name
        user_code
        stars
        owner
      }
      nextToken
    }
  }
`;
export const getLevel = /* GraphQL */ `
  query GetLevel($id: ID!) {
    getLevel(id: $id) {
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
export const listLevels = /* GraphQL */ `
  query ListLevels(
    $filter: ModelLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        level_name
        creator
        default_code
        task
        tutorial
        level_data
        owner
      }
      nextToken
    }
  }
`;
export const getLevelByName = /* GraphQL */ `
  query GetLevelByName(
    $level_name: String
    $sortDirection: ModelSortDirection
    $filter: ModelLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getLevelByName(
      level_name: $level_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        level_name
        creator
        default_code
        task
        tutorial
        level_data
        owner
      }
      nextToken
    }
  }
`;
export const getPublishedLevel = /* GraphQL */ `
  query GetPublishedLevel($id: ID!) {
    getPublishedLevel(id: $id) {
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
export const listPublishedLevels = /* GraphQL */ `
  query ListPublishedLevels(
    $filter: ModelPublishedLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublishedLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        level_name
        creator
        default_code
        task
        tutorial
        level_data
        owner
      }
      nextToken
    }
  }
`;
export const getPublishedLevelByName = /* GraphQL */ `
  query GetPublishedLevelByName(
    $level_name: String
    $sortDirection: ModelSortDirection
    $filter: ModelPublishedLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPublishedLevelByName(
      level_name: $level_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        level_name
        creator
        default_code
        task
        tutorial
        level_data
        owner
      }
      nextToken
    }
  }
`;

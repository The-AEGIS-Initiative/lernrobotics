/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProgress = /* GraphQL */ `
  query GetProgress($id: ID!) {
    getProgress(id: $id) {
      id
      username
      level_name
      user_code
      completed
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
        username
        level_name
        user_code
        completed
        owner
      }
      nextToken
    }
  }
`;

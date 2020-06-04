/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProgress = /* GraphQL */ `
  mutation CreateProgress(
    $input: CreateProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    createProgress(input: $input, condition: $condition) {
      id
      createdAt
      level_name
      user_code
      stars
      owner
    }
  }
`;
export const updateProgress = /* GraphQL */ `
  mutation UpdateProgress(
    $input: UpdateProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    updateProgress(input: $input, condition: $condition) {
      id
      createdAt
      level_name
      user_code
      stars
      owner
    }
  }
`;
export const deleteProgress = /* GraphQL */ `
  mutation DeleteProgress(
    $input: DeleteProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    deleteProgress(input: $input, condition: $condition) {
      id
      createdAt
      level_name
      user_code
      stars
      owner
    }
  }
`;
export const createLevel = /* GraphQL */ `
  mutation CreateLevel(
    $input: CreateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    createLevel(input: $input, condition: $condition) {
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
export const updateLevel = /* GraphQL */ `
  mutation UpdateLevel(
    $input: UpdateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    updateLevel(input: $input, condition: $condition) {
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
export const deleteLevel = /* GraphQL */ `
  mutation DeleteLevel(
    $input: DeleteLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    deleteLevel(input: $input, condition: $condition) {
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
export const createPublishedLevel = /* GraphQL */ `
  mutation CreatePublishedLevel(
    $input: CreatePublishedLevelInput!
    $condition: ModelPublishedLevelConditionInput
  ) {
    createPublishedLevel(input: $input, condition: $condition) {
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
export const updatePublishedLevel = /* GraphQL */ `
  mutation UpdatePublishedLevel(
    $input: UpdatePublishedLevelInput!
    $condition: ModelPublishedLevelConditionInput
  ) {
    updatePublishedLevel(input: $input, condition: $condition) {
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
export const deletePublishedLevel = /* GraphQL */ `
  mutation DeletePublishedLevel(
    $input: DeletePublishedLevelInput!
    $condition: ModelPublishedLevelConditionInput
  ) {
    deletePublishedLevel(input: $input, condition: $condition) {
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
export const createSubmissions = /* GraphQL */ `
  mutation CreateSubmissions(
    $input: CreateSubmissionsInput!
    $condition: ModelSubmissionsConditionInput
  ) {
    createSubmissions(input: $input, condition: $condition) {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const updateSubmissions = /* GraphQL */ `
  mutation UpdateSubmissions(
    $input: UpdateSubmissionsInput!
    $condition: ModelSubmissionsConditionInput
  ) {
    updateSubmissions(input: $input, condition: $condition) {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const deleteSubmissions = /* GraphQL */ `
  mutation DeleteSubmissions(
    $input: DeleteSubmissionsInput!
    $condition: ModelSubmissionsConditionInput
  ) {
    deleteSubmissions(input: $input, condition: $condition) {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const createMarkdownDocs = /* GraphQL */ `
  mutation CreateMarkdownDocs(
    $input: CreateMarkdownDocsInput!
    $condition: ModelMarkdownDocsConditionInput
  ) {
    createMarkdownDocs(input: $input, condition: $condition) {
      id
      doc_name
      doc_content
      createdAt
    }
  }
`;
export const updateMarkdownDocs = /* GraphQL */ `
  mutation UpdateMarkdownDocs(
    $input: UpdateMarkdownDocsInput!
    $condition: ModelMarkdownDocsConditionInput
  ) {
    updateMarkdownDocs(input: $input, condition: $condition) {
      id
      doc_name
      doc_content
      createdAt
    }
  }
`;
export const deleteMarkdownDocs = /* GraphQL */ `
  mutation DeleteMarkdownDocs(
    $input: DeleteMarkdownDocsInput!
    $condition: ModelMarkdownDocsConditionInput
  ) {
    deleteMarkdownDocs(input: $input, condition: $condition) {
      id
      doc_name
      doc_content
      createdAt
    }
  }
`;

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
export const createSubmission = /* GraphQL */ `
  mutation CreateSubmission(
    $input: CreateSubmissionInput!
    $condition: ModelSubmissionConditionInput
  ) {
    createSubmission(input: $input, condition: $condition) {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const updateSubmission = /* GraphQL */ `
  mutation UpdateSubmission(
    $input: UpdateSubmissionInput!
    $condition: ModelSubmissionConditionInput
  ) {
    updateSubmission(input: $input, condition: $condition) {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;
export const deleteSubmission = /* GraphQL */ `
  mutation DeleteSubmission(
    $input: DeleteSubmissionInput!
    $condition: ModelSubmissionConditionInput
  ) {
    deleteSubmission(input: $input, condition: $condition) {
      id
      username
      score
      level_name
      createdAt
    }
  }
`;

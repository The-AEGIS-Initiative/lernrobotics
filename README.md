# LernRobotics
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Discord](https://img.shields.io/discord/700225957314691083?label=Discord)
[![](https://img.shields.io/badge/powered--by-AWS_Amplify-brightgreen)](https://aws.amazon.com/amplify/)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=The-AEGIS-Initiative_robobot&metric=alert_status)](https://sonarcloud.io/dashboard?id=The-AEGIS-Initiative_robobot)

This repo is the codebase for the main [LernRobotics](https://lernrobotics.aegisinitiative.io/) app. 

See [lernrobotics-code-sandbox](https://github.com/The-AEGIS-Initiative/lernrobotics-code-sandbox) for the code-sandbox microservice.
See [lernrobotics-game-server](https://github.com/The-AEGIS-Initiative/lernrobotics-game-server) for the python robot API.

## What is LernRobotics?
**LernRobotics is an educational robotics coding platform** that aims to provide a hands-on robotics experience for everyone without the need for expensive kits or access to resources in schools. All you need to get started is a device with internet (and preferrably a keyboard as well). 

LernRobotics is an open-source project developed and maintained by [The AEGIS Initiative](https://www.aegisinitiative.io/), a non-profit organization dedicated to making educational resources more accessible for everyone.

## Status
LernRobotics has been in active development since Janurary 2020. This project would not be possbile without the contributions of our volunteers and our community. We welcome all contributions that would help push this project forward.

## Table of Contents
  * [Development Setup](#development-setup)
    + [Step 0) Prerequisites](#step-0-prerequisites)
    + [Step 1) Configure AWS Amplify](#step-1-configure-aws-amplify)
    + [Step 2) Set up the app](#step-2-set-up-the-app)
    + [Step 3) Create a LernRobotics Account](#step-3-create-a-lernrobotics-account)
    + [Step 4) Configure Cypress Environment](#step-4-configure-cypress-environment)
  * [Development Guidelines](#development-guidelines)
    + [Before making changes](#before-making-changes)
    + [While making changes](#while-making-changes)
    + [After making changes](#after-making-changes)
  * [Writing Tests](#writing-tests)
  * [Codebase](#codebase)
    + [File Structure](#file-structure)
    + [Component Organization](#component-organization)
    + [Contexts](#contexts)
    + [GraphQL](#graphql)
    
## Development Setup

As this is an multi-component application built on AWS, the development setup is rather involved. Feel free to reach out to us on our [Discord](https://discord.gg/sDgHhzj) with any questions!

### Step 0) Prerequisites
Node.js / NPM: [https://nodejs.org/en/](https://nodejs.org/en/)

### Step 1) Configure AWS Amplify
This app is powered by AWS Amplify. Amplify is a serverless infrastructure that handles all the standard back-end functionalities such as authentication and databases so that we can focus on building the app it self. 

Follow Amplify's setup instructions here: 
[https://docs.amplify.aws/cli/start/install](https://docs.amplify.aws/cli/start/install)

Now you should have your own AWS account, an IAM user for Amplify, and a fully configured Amplify CLI.

### Step 2) Set up the app
1. Clone the repo: `git clone https://github.com/The-AEGIS-Initiative/lernrobotics.git`
2. Move into project root: `cd lernrobotics`
3. Install dependencies: `npm install` 
2. Initialize amplify env for this project: `amplify init`
    - Enter a name for the environment: `<your-env-name>`
    - Do you want to use an AWS profile? `Yes`
    - Please choose the profile you want to use: `default`
3. Provision AWS resources on your AWS account: `amplify push`
    - Are you sure you want to continue? `Yes`
    - Do you want to update code for your updated GraphQL API? `No`

At this point you will have your own fully functional copy of the LernRobotics app to develop on. All back-end resources for auth and APIs are provisioned on your own AWS account. For dev purposes, AWS usage falls well within
the free tiers AWS provides. 

### Step 3) Create a LernRobotics Account
1. Start the lernrobotics app locally: `npm start`
2. Create an general purpose developer admin account (for manual local app usage)
    - Create the account in your local lernrobotics app
    - Login to AWS Console and navigate to AWS Cognito
    - Click "Manage User Pools"
    - Select your user pool: "lernrobotics*****_userpools_*****-<your-amplify-env-name>"
    - Go to "Users and groups" tab
    - Select the user you created, then add to "Admin" group
3. Create an test account for Cypress
    - Create an account in your local lernrobotics app (Don't worry about confirming email)
    - In the AWS Cognito user pool, select the test account and click "Confirm User"
  
### Step 4) Configure Cypress Environment
*  Create a `cypress.env.json` file in the root directory
*  Add the following to the `cypress.env.json` file (replace with your test account credentials from Step 3):
    ```
    {
      "username": "<your-test-account-username>",
      "password": "<your-test-account-password>"
    }
    ```

...And you are done!

## Development Guidelines

### Creating Branches
Please follow this branch name convention:
```
<change-type>/<2-3 word summary>/<ticket-id>
```
where `<change-type>` could be `feature`, `bugfix`, `refactor`, `experimental`, or `hotfix`

### Making Pull Requests
Please follow this PR naming convention:
```
#<ticket-id> <description>
```

### Before making changes:

*  Run app using:
    `npm start`
*  Run [lernrobotics-code-sandbox](https://github.com/The-AEGIS-Initiative/lernrobotics-code-sandbox) in a 2nd terminal
*  Start cypress in a 3rd terminal:
    `npm test`

### While making changes:

Test, test, test!

Anything you build that is not covered by the test suite will probably end up broken.

This project uses primarily Cypress for running tests. See Writing Tests section below for details.

### After making changes:

*  Make your changes and ensure cypress tests pass

*  `git add <your-changed-files>`
*  `git commit -m "<your-commit-message>"`
  *  Write clear commit messages!

*  `git push -U origin <your-branch-name>`
  *  A pre-push git hook will run your changes against the cypress testing suite to ensure passes

* When your changes are complete, make a PR request into master.

## Writing Tests

Cypress tests are stored in the `cypress/integration/` folder. This project breaks up the tests into 2 folders:

*  `cypress/integration/local`
  *  These tests only require the front-end (this app) running.
*  `cypress/integratoin/production`
  *  These tests require the lernrobotics-code-sandbox to be running. These are usually end-2-end (E2E) tests.

Cypress is incredibly intuitive to use. Get started here: [https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)

## Codebase
### File Structure
```sh
lernrobotics/
  ├── amplify/                    # Amplify configuration files
  ├── cypress/                    # Cypress integration tests
  ├── public/                    
    ├── unity_webgl/              # Unity WebGL build files
  ├── src/
    ├── components/               # React components that are reused in multiple views
    ├── contexts/                 # React contexts
    ├── graphql/                  # GraphQL wrappers for Amplify GraphQL API
    ├── hooks/                    # Render-less hooks
    ├── pages/                    # App views
    └── sockets/                  # Socket.io wrappers for lernrobotics-code-sandbox connections
```

### Component Organization
```sh
├── components/                 # Shared components go here
  ├── SharedComponentA/    
  └── SharedComponentB/     
├── pages/                 
  ├── PageA/                
    └── components/             # Components specific to PageA
  ├── PageB/               
    └── components/             # Components specific to PageB
```
- Components that are shared by multiple pages go inside the root component/ folder.
- Every page also has its own components folder for local components

### Contexts
```sh
├── contexts/
  ├── AppContext.js             # Contains user authentication state
  └── GamePageContext.js        # State management for the GamePage  
```

### GraphQL
```sh
├── graphql/
  ├── graphql-controller.js     # Contains CRUD functions to manipulate database
  ├── mutations.js              # Auto-generated file
  ├── queries.js                # Auto-generated file
  └── subscriptions.js          # Auto-generated file
```
`graphql-controller.js` contains many helpful functions for performing CRUD operations on the database. 

The graphQL database schema is defined in
`amplify/backend/api/databaseAPI/schema.graphql`

Amplify provisions DynamoDB resources based on the `schema.graphql` file. You may see the database tables in the AWS DynamoDB Console

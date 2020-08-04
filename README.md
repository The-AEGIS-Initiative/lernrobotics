# Robobot
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Discord](https://img.shields.io/discord/700225957314691083?label=Discord)
[![](https://img.shields.io/badge/powered--by-AWS_Amplify-brightgreen)](https://aws.amazon.com/amplify/)

This repo is the codebase for the main [Robobot](https://robobot.aegisinitiative.io/) app. 

See [robobot-code-sandbox](https://github.com/The-AEGIS-Initiative/robobot-code-sandbox) for the code-sandbox service that powers Robobot.

## What is Robobot?
**Robobot is an educational robotics coding platform** that aims to provide a hands-on robotics experience for everyone without the need for expensive kits or access to resources in schools. All you need to get started is a device with internet (and preferrably a keyboard as well). 

Robobot is open-source projected developed and maintained by [The AEGIS Initiative](https://www.aegisinitiative.io/), a non-profit organization dedicated to making educational resources more accessible for everyone.

## Status
Robobot has been in active development since Janurary 2020. This project would not be possbile without the contributions of our volunteers and our community. We welcome all contributions that would help push this project forward.

## Development Setup

As this is an multi-component application built on AWS, the development setup is rather involved. Feel free to reach out to us on our [Discord](https://discord.gg/sDgHhzj) with any questions!

### Step 1) Configure AWS Amplify
This app is powered by AWS Amplify. Amplify is a serverless infrastructure that handles all the standard back-end functionalities such as authentication and databases so that we can focus on building the app it self. 

Follow Amplify's setup instructions here: 
[https://docs.amplify.aws/cli/start/install](https://docs.amplify.aws/cli/start/install)

Now you should have your own AWS account, an IAM user for Amplify, and a fully configured Amplify CLI.

### Step 2) Set up the app
1. Clone the repo: `git clone https://github.com/The-AEGIS-Initiative/robobot.git`
2. Move into project root: `cd robobot`
3. Install dependencies: `npm install` 
2. Initialize amplify env for this project: `amplify init`
    - Enter a name for the environment: `<your-env-name>`
    - Do you want to use an AWS profile? `Yes`
    - Please choose the profile you want to use: `default`
3. Provision AWS resources on your AWS account: `amplify push`
    - Are you sure you want to continue? `Yes`
    - Do you want to update code for your updated GraphQL API? `No`

At this point you will have your own fully functional copy of the Robobot app to develop on. All back-end resources for auth and APIs are provisioned on your own AWS account. For dev purposes, AWS usage falls well within
the free tiers AWS provides. 

### Step 3) Create a Robobot Account
1. Start the robobot app locally: `npm start`
2. Create an general purpose developer admin account (for manual local app usage)
    - Create the account in your local robobot app
    - Login to AWS Console and navigate to AWS Cognito
    - Click "Manage User Pools"
    - Select your user pool: "robobot*****_userpools_*****-<your-amplify-env-name>"
    - Go to "Users and groups" tab
    - Select the user you created, then add to "Admin" group
3. Create an test account for Cypress
    - Simply create this account, no extra steps needed
    - Do not use this account manually
  
### Step 4) Configure Cypress Environment
*  Create a `cypress.env.json` file in the root directory
*  Add the following to the `cypress.env.json` file (replace with your test account credentials from Step 3):

    ```
    {
      "username": "<your-test-account-username>",
      "password": "<your-test-account-password>"
    }
    ```

You are done!

## Development Workflow

### Before making changes:

*  Run app using:
    `npm start`
*  Run Robobot back-end in a 2nd terminal
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
  *  Commit message should follow semantic convention such as:
    *  major(api): API rewrite, not backwards compatible!
    *  feat(log): add new logging feature
    *  fix(config): always load config first
    *  chore(ci): semantic commit without triggering new version

*  `git push -U origin <your-branch-name>`
  *  A pre-push git hook will run your changes against the cypress testing suite to ensure passes

### Pull Requests and Merging

When your changes are complete, make a pull request into the `master` branch.

*  Once your PR is approved, you may merge your branch into the master branch. This will trigger a rebuild of the development-robobot app.

*  Log-in to the AWS Amplify console and confirm that the development branch is green.
  *  If there are errors, fix them ASAP.

## Writing Tests

Cypress tests are stored in the `cypress/integration/` folder. This project breaks up the tests into 2 folders:

*  `cypress/integration/front-end-only`
  *  These tests only require the front-end (this app) running.
*  `cypress/integratoin/front-and-back-end`
  *  These tests require the back-end to be running. These are usually end-2-end (E2E) tests.

Cypress is incredibly intuitive to use. Get started here: [https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)

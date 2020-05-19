Repository: [https://bitbucket.org/theaegisinitiative/front-end/](https://bitbucket.org/theaegisinitiative/front-end/)

# Development Setup

## Step 1: Basic Git Stuff

- `git init`
- `git remote add origin \<repo-url>`
- `git pull origin master`
- `npm install`
- `git checkout -b "<your-branch-name>"`

## Step 2: Install AWS CLI and Configure IAM User

- https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
- restart your terminal
- `aws configure`
  - AWS Access Key: \*\*
  - AWS Secret Access Key: \*\*
  - Default region name: _us-west-2_
  - Default output format: _json_

## Step 2: Setup Amplify CLI and Project

- `npm install -g @aws-amplify/cli`
- `amplify init`
  - Do you want to use an existing environment? _Yes_
  - Choose the environment you would like to use: _dev_
  - Choose your default editor: _Your preferred editor_
  - Do you want to use an AWS Profile: _Y_
    - Select your profile from Step 2
- `amplify pull`

## Step 3: Create a Robobot Account

- Go to [https://development-robobot.aegisinitiative.io/](https://development-robobot.aegisinitiative.io/)

- Create 2 accounts:

  - General purpose developer admin account
    - This is the account you will use when interacting with the app
  - Test account
    - This will be the test account Cypress uses to run tests. Do not use this account manually.

- Contact an admin to give your developer account admin status

## Step 4: Configure Cypress Environment

- Create a `cypress.env.json` file in the root directory
- Add the following to the `cypress.env.json` file (replace with your test account credentials):
  ```
  {
    "username": "<your-test-account-username>",
    "password": "<your-test-account-password>"
  }
  ```

# Development Workflow

### Before making changes:

- Run app using:

  - `npm start`

- Run Robobot back-end in a 2nd terminal

- Start cypress in a 3rd terminal:

  - `npm test`

### While making changes:

Test, test, test!

Anything you build that is not covered by the test suite will probably end up broken.

This project uses primarily Cypress for running tests. See Writing Tests section below for details.

### After making changes:

- Make your changes and ensure cypress tests pass

- `git add <your-changed-files>`
- `git commit -m "<your-commit-message>"`

  - Commit message should follow semantic convention such as:
    - major(api): API rewrite, not backwards compatible!
    - feat(log): add new logging feature
    - fix(config): always load config first
    - chore(ci): semantic commit without triggering new version

- `git push -U origin <your-branch-name>`
  - A pre-push git hook will run your changes against the cypress testing suite to ensure passes

### Pull Requests and Merging

When your changes are complete, make a pull request into the `master` branch.

- Once your PR is approved, you may merge your branch into the master branch. This will trigger a rebuild of the development-robobot app.

- Log-in to the AWS Amplify console and confirm that the development branch is green.
  - If there are errors, fix them ASAP.

# Writing Tests

Cypress tests are stored in the `cypress/integration/` folder. This project breaks up the tests into 2 folders:

- `cypress/integration/front-end-only`
  - These tests only require the front-end (this app) running.
- `cypress/integratoin/front-and-back-end`
  - These tests require the back-end to be running. These are usually end-2-end (E2E) tests.

Cypress is incredibly intuitive to use. Get started here: [https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)

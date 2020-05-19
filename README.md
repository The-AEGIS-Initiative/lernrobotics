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

# Development Workflow

### Before making changes:

- Run app using:

  `npm start`

- Run Robobot back-end in a 2nd terminal

- Start cypress in a 3rd terminal:

  `npm test`

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

- You may submit a PR to merge your branch into the development branch.

- Once your PR is approved, you may merge your branch into the master branch. This will trigger a rebuild of the development-robobot app.

- Log-in to Amplify console and confirm that the development branch is green.
  - If there are errors, fix them ASAP.

# Testing

Repository: [https://bitbucket.org/theaegisinitiative/front-end/](https://bitbucket.org/theaegisinitiative/front-end/)

# Development Usage

## Step 1: Basic Git Stuff

- git init
- git remote add origin \<repo-url>
- git pull origin master
- npm install
- git checkout -b "<your-branch-name>"

## Step 2: Install AWS CLI and Configure IAM User

- https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
- restart terminal
- aws configure
  - AWS Access Key: \*\*
  - AWS Secret Access Key: \*\*
  - Default region name: _us-west-2_
  - Default output format: _json_

## Step 2: Setup Amplify CLI and Project

- npm install -g @aws-amplify/cli
- amplify init
  - Do you want to use an existing environment? _Yes_
  - Choose the environment you would like to use: _dev_
  - Choose your default editor: _Your preferred editor_
  - Do you want to use an AWS Profile: _Y_
    - Select your preferred profile
- amplify pull

## Step 3: Development Workflow

- Run app using:

  npm start

- Ensure Robobot-backend is running in a 2nd terminal

- Start cypress in a 3rd terminal:

  npx cypress open --env baseUrl=localhost:3000

- Make your changes and ensure cypress tests pass
- git add <your-changed-files>
- git commit -m "<your-commit-message>"
- git push -U origin <your-branch-name>
  - A pre-push git hook will run your changes against the cypress testing suite to ensure passes

If your push succeeds, it will trigger the amplify CI/CD pipeline. Every branch automatically gets provisioned its
own build on AWS Amplify.

- Log in the Amplify Console
- Find your branch and monitor for errors
- If everything passes, you may submit a PR to merge your branch into the development branch
  - If you can't figure out why your build won't pass on Amplify, ask the admins for help!

Repository: [https://github.com/TeachRobo/front-end](https://github.com/TeachRobo/front-end)

Documentation: [https://teachrobo.github.io/front-end/](https://teachrobo.github.io/front-end/)

# Usage
## Using npm
Update node_modules with
#### `npm ci`
\
Obtain .env.development file from admin and place in project root
\
Start nodejs server using
#### `npm start`

## Using Docker
#### `docker run -p 5000:5000 kevinkqi/robobot-frontend:latest`


# Development Guidelines
Please read this section before making any changes!
## Contributing
#### Branch before making changes!
#### `git checkout -b <your-branch-name>`
\
Push the new branch to github and set it as the upstream branch using the `-u` option
#### `git push -u origin <your-branch-name>`
\
Make frequent commits (On your branch)

Each commit should be described easily in 1 line. Commits that require multiple lines should be split into smaller commits.
#### `git commit -m "<commit description>"`
\
Push commits to your upstream branch using
#### `git push`
\
Once your changes are complete and fully functional, create a merge request on github and ask someone to confirm it.
\
\
When your branch is no longer needed, you should delete it
#### `git branch -d <your-branch-name>`
Delete the upstream branch (<b>Do not delete branches that are not yours!</b>)
#### `git push origin --delete <your-branch-name>`
## Installing npm modules
Use --save when installing npm modules to ensure dependencies are installed locally.
#### `npm install --save <package-name>`

## Documenting Your Code
#### Document your code <b>BEFORE</b> pushing changes!

 This project uses `jsdoc` (for javascript) and `better-docs` (for react components)

See [https://devhints.io/jsdoc](https://devhints.io/jsdoc) for jsdoc syntax
\
\
See [https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js/](https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js/) for react specific documentation
\
\
\
<b>BEFORE</b> pushing changes, generate html documentation files using
#### `npm run docs`
\
View current local documentation at
#### `docs/index.html`
\
View master branch documentation at
#### [https://teachrobo.github.io/front-end/](https://teachrobo.github.io/front-end/)



# Project File Structure
### React App

##### `src/sections/`
Components composing the main pieces of the gamePage
##### `src/pages/`
Components referenced by react-router-dom
##### `src/components/`
Custom modular React components
##### `public/`
Assets available publicly. Includes Index.html which is served to the browser on load.
##### `App.js / index.js`
Wrappers around entire React app for browser consumption
##### `package.json`
Config file for app-wide settings
##### `package-lock.json`
Contains all dependencies information
##### `node_modules/`
Includes installed dependencies. Use npm ci to install correct dependency versions according to package-lock.json.

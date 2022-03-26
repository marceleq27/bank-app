# Bank app

Bank app is a simple project with CRUD actions, you can use this repo for experimenting :)

Repo: [https://github.com/marceleq27/bank-app](https://github.com/marceleq27/bank-app)

Link to app: [https://bankproject.netlify.app](https://bankproject.netlify.app)

## What you need

- [Node](https://nodejs.org/en/) v.14 >=
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 6>=

### How to run project

- make sure you are in directory with *package.json* and run `npm install`
- `npm start`
- project will be available on [localhost:3000](http://localhost:3000/)

### Deployment

App is hosted on Netlify. After your commit, Netlify will detect changes, rebuild project with following command: `npm install && npm run build` and publish it. You can read more about this tool [here](https://www.netlify.com/).

**Requirements:**

- Write/read access to this repo - create an issue with title *Access to repo - {YOUR_GITHUB_NICKNAME}*

If you want to see your changes live on website, you have to `git push` your changes to *master* branch - AWS will automatically detect your commit and rebuild project. Normally it takes about 2-3 minutes.

#### Features

- Login/logout (via Google)
- Create account
- Desposit
- Send
- Withdraw

Technologies:

- Google Firebase (database)
- React
  - Ant Design
  - @react-firebase


## Contributing

Create an issue or make a PR, I'm open for any suggestions :)

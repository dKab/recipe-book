Development
===========

**npm run dev** Use this command to start node.js server in development mode (using webpack-dev-middleware which will use `config/webpack.config.dev.js`).
It will run `src/server/index.js` via _nodemon_ (to watch files for change and restart server) transpiling it on the fly with _babel-node_ (handy but slow). 

Build & Production
==================

**npm start** will pre-compile server code with babel and put it in `dist/server/index.js` then it will run it in `prod` mode. It will also bundle client code with webpack using `config/webpack.config.prod.js` 
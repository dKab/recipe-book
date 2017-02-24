[![Build Status](https://travis-ci.org/dKab/recipy-book.svg?branch=master)](https://travis-ci.org/dKab/recipy-book)

Development
===========

**npm run dev** 
 Use this command to start node.js server in development mode (using webpack-dev-middleware which will use `config/webpack.config.dev.js`).
 Hot reloading is enabled. Client bundle will be recompiled with every change, however server bundle won't (HMR wouldn't work if server was recompiled on every change). So in order to see changes made to server code we need to manually recompile server bundle and restart the app.
 Use **npm run build-server** to do so. 

Build & Production
==================

**npm start** will create two bundles for client and server code and run server bundle with `node`.

Use **npm run test** for testing.  


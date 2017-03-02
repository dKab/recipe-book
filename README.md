[![Build Status](https://travis-ci.org/dKab/recipy-book.svg?branch=master)](https://travis-ci.org/dKab/recipy-book)

Development
===========

**npm run dev** 
 This will start koa server and webpack-dev-server for hot-module-replacement.
 Open browser at 8080 port. 
 Note that server bundle won't recompile by itself, so in order to see changes made to server code we need to manually recompile server bundle and restart the app.
 Use **npm run build-server** to do so. 

Build & Production
==================

**npm start** will create two bundles for client and server code and put them in `/public/` folder in the root of the project.
run server bundle with `node`.
The server will start at 3000 port.

Use **npm run test** for testing.  


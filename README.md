[![Build Status](https://travis-ci.org/dKab/recipe-book.svg?branch=master)](https://travis-ci.org/dKab/recipe-book)

Development
===========

First things first - database.
Create database if it doesn't exist already by running `npm run create-database`. It'll create 3 databases 
(dev, prod, test, schema, two urers - https://technicallyrural.ca/2017/01/18/postgresql-for-web-apps/).
Then to create tables and populate them with data run command `psql -U recipe-book-admin recipe-book_development < database-dump.sql`.
If this step fails with error `no schema has been selected to create in` or similar you'll 
have to set default schema for users:
enter into postgresql terminal `psql` under superuser (usually `postgres`) and execute these two commands:

`min_auth_test=> ALTER ROLE recipe-book-admin SET search_path TO recipe-book;`
`min_auth_test=> ALTER ROLE recipe-book-web-user SET search_path TO recipe-book;`
exit by typing `\q`
Now try again restoring database from dump file - it should work.

For now we will have to dump db schema into that every time the schema changes. So to make sure
you have actual schema every time you pull changes you have to run this command.

If there were changes to db schema, or data added that you want to save you want to dump the db:
`pg_dump -d recipe-book_development -U recipe-book-admin --file database-d
ump.sql`
It will prompt for password for `recipe-book-admin` user.  

**npm run dev** 
 This will start koa server and webpack-dev-server for hot-module-replacement.
 Open browser at 8080 port. 
 Note that server bundle won't recompile by itself, so in order to see changes made to server code we need to manually recompile server bundle and restart the app.
 Use **npm run build-server** to do so. 

Build & Production
==================

**npm start** will create two bundles for client and server code and put client bundle in `/public/` folder in the root of the project.
After that it will launch server bundle using `node`.
The server will start at 3001 port.

Use **npm run test** for testing.  


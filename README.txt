Good day!
Here are the steps to launch CRUD API Users project.

1) Please, open a new folder, clone the project and install dependencies with the following commands in terminal:

git clone https://github.com/andrei8977/crudnestjs2
cd crudnestjs2
npm ci

2) Create a database "usersdb" in pgAdmin4 PostgreSQL.
Create a superuser with name "newuser1" and password "password".

You can choose another name for database and another user, but please be sure that you will
change these settings in ".env" file if you do so.
Here are the link by default:
DATABASE_URL="postgresql://newuser1:password@localhost:5432/usersdb?schema=public"

3) Launch the following command to start database migration:
npx prisma migrate dev --name init

4) Run the prject with the following command:
npm run start

5) Now you can open Swagger documentation and work with CRUD API:
http://localhost:3000/docs

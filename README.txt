Good day!
Here are the steps to launch CRUD API Users project.

1) Please, open a new folder, clone the project and install dependencies with the following commands in terminal:

git clone https://github.com/andrei8977/crudnestjs2
cd crudnestjs2
npm ci

2) Create a database "usersdb" in pgAdmin4 PostgreSQL

3) Launch the following command to start database migration:
npx prisma migrate dev --name init

4) Run the prject with the following command:
npm run start

5) Open Swagger documentation and work with CRUD API:
http://localhost:3000/docs

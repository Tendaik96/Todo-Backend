# Todo-Backend

# How did I build this
1. npm init
2. npm install typescript ts-node @types/node --save-dev
3. npx tsc --init
4. npm install prisma --save-dev
5. npx prisma init --datasource-provider mySql
6. download MySQL (`https://dev.mysql.com/downloads/windows/installer/5.7.html`)


Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.


formatting file: 
- npx prisma format

Add changes to database:
- npx prisma migrate dev --name init
expect to see: Your database is now in sync with your schema.


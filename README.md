# Todo-Backend

### 🎫 Ticket 1 - Starter Files
1. Install all packages listed below. In the script section, add a `dev` entry. This will enable you to start the Express server using `nodemon` by running `npm run dev` in the terminal. In your `.gitignore` file, add `node_modules` and `.env` to prevent these files from being pushed to GitHub.

    #### Ensure all these packages are installed:
    - Express.js (`npm i express`)
    - Dotenv (`npm i dotenv`)
    - TS-node (`npm i ts-node`)
    - Nodemon (`npm i nodemon --save-dev`)
    - Types for express (`npm i @types/express --save-dev`)

2. Run the following commands:
    - `npm init`
    - `npm install typescript ts-node @types/node --save-dev`
    - `npx tsc --init`
    - `npm install prisma --save-dev`
    - `npx prisma init --datasource-provider mySql`
    - Download MySQL ([MySQL Download](https://dev.mysql.com/downloads/windows/installer/5.7.html))
    - `npm i @prisma/client`
    - `npx prisma generate`

Next steps:
1. Set the `DATABASE_URL` in the `.env` file to point to your existing database. If your database has no tables yet, read [Prisma Getting Started](https://pris.ly/d/getting-started).
2. Run `npx prisma db pull` to turn your database schema into a Prisma schema.
3. Run `npx prisma generate` to generate the Prisma Client. You can then start querying your database.

To format the file:
- `npx prisma format`

To add changes to the database:
- `npx prisma migrate dev --name init`
  - You should see: "Your database is now in sync with your schema."

Add the following to the Prisma schema:
```prisma
model Todo {
  id       Int    @id @default(autoincrement())
  task     String
  progress String
}
```

Zod Requirements: Enable strict mode in your `tsconfig.json`. This is a best practice for all TypeScript projects.
- `npm install zod`

Create async functions and incorporate the respective API for the headings below. Ensure parameters and variables have the correct static types (TypeScript).

### Async Functions:
- getAllTodos
- createTodo
- getTodoById
- editTodoById
- deleteTodo
- deleteAllTodos

Ensure that the todo object strictly abides by the types object. Use Zod to enforce this. Refer to the [Zod Documentation](https://zod.dev/?id=basic-usage).

### 🎫 Ticket 2 - Creating Routes
1. Create a `routes` folder. Inside it, create files: `getAllTodos.ts`, `createTodo.ts`, `editTodoById.ts`, `getTodoById.ts`, `deleteTodo.ts`, and `deleteAllTodos.ts`.
2. Implement the functionality for all routers. Ensure all variables and parameters are correctly statically typed.
3. Export your router and import it in `app.ts`.

### 🎫 Ticket 3 - Bring Everything Together

1. In `app.ts`, import `express`, `Request`, `Response`, `NextFunction`, and `Application` from express. Create an instance of an Express application.
2. If you have a PORT number in your `.env` file, import it and store it in a variable. This will be needed to run the server.
3. Use `app.use()` method to bind the imported routers to a specified path. Note that the path extension in the route handler will add to this base path, creating a complete URL for a specific endpoint.
4. Use the `app.listen` method to start the Express server, passing the port and the callback function as arguments.
5. Ensure parameters and variables have the correct static types (TypeScript).

   💡 Test out the route handler by sending an HTTP GET request via Postman. Don't forget to start the server beforehand with `npm run dev`. See the `Postman endpoints test` section for URL.

6. Repeat the process from Ticket 2 and Ticket 3.3 for all route files, incorporating the corresponding logic for their request handlers. Refer to the API reference section.

### 🥇 You've Finished!

- 🔍 Take another look at your code and see if you can refactor anything.
- 📮 If you make any changes while refactoring, make sure to re-test your routes using Postman.

| HTTP   | Path                       | Response Body                                                   | Status Code | Description                  |
| :----- | :------------------------- | :-------------------------------------------------------------- | :---------- | :--------------------------- |
| GET    | /api/alltodos              | An array of objects representing all Todos                      | 200         | Get all Todos                |
| GET    | /api/todo/:id              | An object containing the details of a specific Todo             | 200         | Get Todo by ID               |
| POST   | /api/createtodo            | An object representing the created Todo                         | 201         | Create a new Todo            |
| PATCH  | /api/todo/:id              | An object representing the updated Todo                         | 200         | Edit Todo by ID              |
| DELETE | /api/deletetodo/:id        | A confirmation message or object representing the deleted Todo  | 200         | Delete Todo by ID            |
| DELETE | /api/deletealltodos        | A confirmation message or object representing all deleted Todos | 200         | Delete all Todos             |

## Postman Endpoints Test

- www.localhost:3000/api/alltodos
- www.localhost:3000/api/todo/:id
- www.localhost:3000/api/createtodo
- www.localhost:3000/api/deletetodo/:id
- www.localhost:3000/api/deletealltodos

Please see the `postmanApiDoc.md` file for details on API tests.

### Stretch Goal:
Create a new table related to the Todos table that captures the user's name and password. This ensures that each user who logs into the app can see their own tasks and is not authorized to view the tasks of other users.

Prisma schema for authentication:
```prisma
model User {
  id       Int    @id @default(autoincrement())
  username String
  password String
  email    String
}
```

Connect to the Frontend:
1. Install `cors` to enable cross-origin requests.
2. Use the `fetch` method to retrieve data from the backend. Ensure the fetch request defines its headers to avoid errors.

## Running Instructions
1. To start the app, enter this command into the terminal: `npm run dev`. This runs the frontend of the project.
2. Go to the backend repository and enter this command into the terminal: `npm run dev`. This will run the backend.
3. Ensure that both the frontend and backend do not run on the same port.
4. You can now start using the app.
import express, { Application, NextFunction, Request, Response } from 'express';
import allRouter from './routes/allTodos';
import getTodoRouter from './routes/getTodoById'
import createRouter from './routes/createTodo'
import deleteRouter from './routes/deleteTodo'
import deleteAllRouter from './routes/deleteAllTodos'
import cors from 'cors'

const app: Application = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors())

app.use("/api/alltodos", allRouter);
app.use("/api/todo", getTodoRouter)
app.use("/api/createtodo", createRouter);
app.use("/api/deletetodo", deleteRouter);
app.use("/api/deletealltodos", deleteAllRouter);

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.url);
    next();
};
app.use(logger);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});

export default app;




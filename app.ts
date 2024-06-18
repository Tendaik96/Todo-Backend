import express, { Application, NextFunction, Request, Response } from 'express';
import allRouter from './routes/allTodos';
import createRouter from './routes/createTodo'
import deleteRouter from './routes/deleteTodo'

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use("/api/alltodos", allRouter);
app.use("/api/createtodo", createRouter);
app.use("/api/deletetodo", deleteRouter);

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.url);
    next();
};
app.use(logger);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});

export default app;




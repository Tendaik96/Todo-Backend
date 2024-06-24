import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { editTodoById, getTodoById, editTodoType } from "../models/todos";
import { z } from "zod";

const getTodoRouter = express.Router();
const prisma = new PrismaClient();

//typescript static typing
/* type allTodosType = {
    id: number;
    task: string;
    progress: string;
}[] */

const todoType = z.object({
      id: z.number(),
      task: z.string(),
      progress: z.enum(["incomplete", "in progress", "complete"]),
    }).strict()

//ZOD: https://zod.dev/?id=primitives, https://zod.dev/?id=arrays

//Route handler for get all todos
getTodoRouter.get("/:id", async function (req: Request, res: Response) {
  try {
    const id : number = Number(req.params.id)

    const todo = await getTodoById(id);
    const parseTodos = todoType.parse(todo);

    res.status(200).json({ success: true, payload: parseTodos });
    console.log(todo);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

getTodoRouter.patch("/:id", async function (req: Request, res: Response) {
  try {
    const id: number = Number(req.params.id)
    const editTodo = editTodoType.parse(req.body)

    console.log("Editing Todo ID:", id);
    console.log("New Values:", editTodo);

    const todo = await editTodoById(id, editTodo);

    res.status(200).json({ success: true, payload: todo });
    console.log(todo);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

export default getTodoRouter;

import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { getAllTodo } from '../models/todos'
import { z } from "zod";

const allRouter = express.Router()
const prisma = new PrismaClient();

/* type allTodosType = {
    id: number;
    task: string;
    progress: string;
}[] */

const allTodosType = z.array(z.object({
    id: z.number(),
  task: z.string(),
progress: z.enum(["incomplete", "in progress", "complete"])
}).strict())

//ZOD: https://zod.dev/?id=primitives, https://zod.dev/?id=arrays


//Route handler for get all todos
allRouter.get("/", async function (req: Request, res: Response) { 

    try {
        const allTodo = await getAllTodo()
        const parseTodos = allTodosType.parse(allTodo)
        
        res.status(200).json({ success: true, payload: parseTodos }); 
        console.log(allTodo)
        
    } catch (error : any) {
       console.error(error.message)
        res.status(400).json({ error: error.message });

    } finally {
       
        await prisma.$disconnect()
    
    }
    
})

export default allRouter
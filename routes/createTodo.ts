import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { createTodo } from '../models/todos'

const createRouter = express.Router()
const prisma = new PrismaClient();

    type newTodoType = {
    task: string,
    progress: "incomplete" | "in progress" | "complete"
}


//Route handler for get all todos
createRouter.post("/", async function (req: Request, res: Response) { 

    try {
        const newEntry :newTodoType = req.body
        const createItem = await createTodo(newEntry)

        if (!newEntry.task || !newEntry.progress) {
            throw new Error("Invalid input");
        }
        
        res.status(200).json({ success: true, payload: createItem }); 
        console.log(req.body)
        
    } catch (error : any) {
       console.error(error.message)
        res.status(400).json({ error: error.message });

    } finally {
       
        await prisma.$disconnect()
    
    }
    
})

export default createRouter
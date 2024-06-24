import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { createTodo, newTodoType } from '../models/todos'

const createRouter = express.Router()
const prisma = new PrismaClient();


//Route handler for create a new todo
createRouter.post("/", async function (req: Request, res: Response) { 

    try {
        const newEntry = newTodoType.parse(req.body);

        if (!newEntry.task || !newEntry.progress) {
            throw new Error("Invalid input");
        }

         const createItem = await createTodo({data: newEntry})
        
        res.status(200).json({ success: true, payload: createItem }); 
        console.log("Request body:", req.body);
        console.log("Created item:", createItem);
        
    } catch (error : any) {
       console.error(error.message)
        res.status(400).json({ error: error.message });

    } finally {
       
        await prisma.$disconnect()
    
    }
    
})

export default createRouter

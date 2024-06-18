import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { getAllTodo } from '../models/todos'

const allRouter = express.Router()
const prisma = new PrismaClient();

type allTodosType = {
    id: number;
    task: string;
    progress: string;
}[]


//Route handler for get all todos
allRouter.get("/", async function (req: Request, res: Response) { 

    try {
        const allTodo : allTodosType = await getAllTodo()
        
        res.status(200).json({ success: true, payload: allTodo }); 
        console.log(allTodo)
        
    } catch (error : any) {
       console.error(error.message)
        res.status(400).json({ error: error.message });

    } finally {
       
        await prisma.$disconnect()
    
    }
    
})

export default allRouter
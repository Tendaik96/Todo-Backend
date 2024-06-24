import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { deleteAllTodos } from '../models/todos'

const deleteAllRouter = express.Router()
const prisma = new PrismaClient();

//Route handler for delete todo
deleteAllRouter.delete("/", async function (req: Request, res: Response) { 

    try {
        const deleteTodos  = await deleteAllTodos()
        
        res.status(200).json({ success: true, payload: deleteTodos }); 
        console.log(deleteTodos)
        
    } catch (error : any) {
       console.error(error.message)
        res.status(400).json({ error: error.message });

    } finally {
       
        await prisma.$disconnect()
    
    }
    
})

export default deleteAllRouter
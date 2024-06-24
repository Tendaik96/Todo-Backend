import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { deleteTodoById } from '../models/todos'

const deleteRouter = express.Router()
const prisma = new PrismaClient();

//Route handler for delete todo
deleteRouter.delete("/:id", async function (req: Request, res: Response) { 

    try {
        const deleteTodo  = await deleteTodoById(Number(req.params.id))
        
        res.status(200).json({ success: true, payload: deleteTodo }); 
        console.log(deleteTodo)
        
    } catch (error : any) {
       console.error(error.message)
        res.status(400).json({ error: error.message });

    } finally {
       
        await prisma.$disconnect()
    
    }
    
})

export default deleteRouter
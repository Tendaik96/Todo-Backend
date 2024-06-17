import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// its always a good idea to disconnect from the database as soon as you program finishes running

async function getAllTodo() {
    const todo = await prisma.todo.findMany()
    console.log(todo)
}

getAllTodo()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })




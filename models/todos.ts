import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";

// its always a good idea to disconnect from the database as soon as you program finishes running


//GET ALL TODOS'
export async function getAllTodo() {
    const todo = await prisma.todo.findMany()
    console.log(todo)
    return todo
}

/* getAllTodo()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */


// CREATE TODO

//ZOD: Creating an object schema from https://zod.dev/?id=basic-usage
export const newTodoType = z.object({
  task: z.string(),
progress: z.enum(["incomplete", "in progress", "complete"])
}).strict();


export type newTodoType =  z.infer<typeof newTodoType>;

/* export type newTodoType =  {
    task: string,
    progress: "incomplete" | "in progress" | "complete"
} */

export async function createTodo( { data: newTodo } : { data :newTodoType}) {
    const todo = await prisma.todo.create({ data: newTodo });
    console.log(todo)
    return todo
}

/* createTodo({data :{task: "ru 9 k", progress: "complete"}})
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */


// DELETE ONE TODO
export async function deleteTodoById(id: number) {
    const deleteUser = await prisma.todo.delete({
  where: {
    id: id,
  },
    })

    // Reset the AUTO_INCREMENT value to 1
//   await prisma.$executeRaw`ALTER TABLE todo AUTO_INCREMENT = 1`;
    console.log(deleteUser)
}

/* deleteTodoById(5)
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */


//DELETE ALL TODOS
export async function deleteAllTodos() {
    const deleteTodos = await prisma.todo.deleteMany({})
    await prisma.$executeRaw`ALTER TABLE todo AUTO_INCREMENT = 1`;
    console.log(deleteTodos)
    /* return deleteTodos */
}

/* deleteAllTodos()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */


       /*  export async function deleteTodoByTask(task: string) {
    const deleteUser = await prisma.todo.delete({
  where: {
    task: task,
  },
})
    console.log(deleteUser)
} */

/* deleteTodoByTask(25)
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */

        

// delete multiple with same heading
/* export async function deleteManyTodo() {
    const deleteUser = await prisma.todo.deleteMany({
  where: {
    task: 'write a blog',
  },
})
    console.log(deleteUser)
}

deleteManyTodo()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })  */




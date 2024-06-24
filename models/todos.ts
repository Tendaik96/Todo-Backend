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

 getAllTodo()
   /* .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */

//GET TODOS by ID'
export async function getTodoById(id: number) {
const todo = await prisma.todo.findUnique({
  where: {
    id: id,
  },
})
    console.log(todo)
    return todo
}
//getTodoById(7)

//EDIT TODO
export const editTodoType = z.object({
  task: z.string(),
progress: z.enum(["incomplete", "in progress", "complete"])
}).strict();

export type editTodoType =  z.infer<typeof editTodoType>;

export async function editTodoById(id: number, obj : editTodoType ) {
const updatedTodo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      task: obj.task,
      progress: obj.progress,
    },
  });

  console.log(updatedTodo);
  return updatedTodo;
}
//editTodoById(1, {task: "hello", progress: "complete"})


// CREATE TODO
//ZOD: Creating an object schema from https://zod.dev/?id=basic-usage
export const newTodoType = z.object({
  task: z.string(),
progress: z.enum(["incomplete", "in progress", "complete"])
}).strict();

export type newTodoType =  z.infer<typeof newTodoType>;

// without ZOD
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




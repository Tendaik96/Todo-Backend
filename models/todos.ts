import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// its always a good idea to disconnect from the database as soon as you program finishes running


//GET ALL TODOS'
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


// CREATE TODO
async function createTodo(task: string, progress: "incomplete" | "in progress" | "complete") {
    const todo = await prisma.todo.create({ data: { task: task, progress: progress } })
    console.log(todo)
}

/* createTodo("run 5 k", "complete")
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */


// DELETE ONE TODO
async function deleteTodoById(id: number) {
    const deleteUser = await prisma.todo.delete({
  where: {
    id: id,
  },
    })

    // Reset the AUTO_INCREMENT value to 1
//   await prisma.$executeRaw`ALTER TABLE todo AUTO_INCREMENT = 1`;
    console.log(deleteUser)
}

deleteTodoById(5)
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })


//DELETE ALL TODOS
async function deleteAllTodos() {
    const deleteTodos = await prisma.todo.deleteMany({})
    await prisma.$executeRaw`ALTER TABLE todo AUTO_INCREMENT = 1`;
    console.log(deleteTodos)
}

/* deleteAllTodos()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) */


       /*  async function deleteTodoByTask(task: string) {
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
/* async function deleteManyTodo() {
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




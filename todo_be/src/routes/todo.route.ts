import { Router } from "express";
import TodoController from "../controllers/todo.controller"

const todoController = new TodoController()
const router = Router()

//GET ALL
router.get('/tasks', todoController.getAll)
//GET ONE
router.get('/task/:id', todoController.getOne)
//POST
router.post('/task', todoController.post)
//PUT
router.put('/task/:id', todoController.put)
//DELETE
router.delete('/task/:id', todoController.delete)

export default router

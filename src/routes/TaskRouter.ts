import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router()

router.post("/tasks", TaskController.register)
router.get("/tasks", TaskController.getAll)
router.get("/tasks/:taskId", TaskController.getById)
router.put("/tasks/:taskId", TaskController.update)
router.delete("/tasks/:taskId", TaskController.delete)

export default router
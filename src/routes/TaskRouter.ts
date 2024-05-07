import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router()

router.post("/tasks", TaskController.register)
router.get("/tasks", TaskController.getAll)
router.get("/tasks/:taskId", TaskController.getById)

export default router
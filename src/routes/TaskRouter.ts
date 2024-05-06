import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router()

router.post("/tasks", TaskController.register)

export default router
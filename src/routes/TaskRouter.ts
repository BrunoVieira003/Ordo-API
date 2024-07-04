import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router()

router.post("/", TaskController.register)
router.get("/", TaskController.getAll)
router.get("/:taskId", TaskController.getById)
router.put("/:taskId", TaskController.update)
router.delete("/:taskId", TaskController.delete)

export default router
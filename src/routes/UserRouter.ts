import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router()

router.post("/", UserController.register)
router.get("/", UserController.getAll)
router.get("/:userId", UserController.getById)
router.put("/:userId", UserController.update)
router.delete("/:userId", UserController.delete)

export default router
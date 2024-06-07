import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router()

router.post("/users", UserController.register)
router.get("/users", UserController.getAll)
router.get("/users/:userId", UserController.getById)
router.put("/users/:userId", UserController.update)
router.delete("/users/:userId", UserController.delete)

export default router
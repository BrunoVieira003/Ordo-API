import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router()

router.post("/users", UserController.register)
router.get("/users", UserController.getAll)
router.get("/users/:userId", UserController.getById)

export default router
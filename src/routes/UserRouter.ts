import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router()

router.post("/users", UserController.register)

export default router
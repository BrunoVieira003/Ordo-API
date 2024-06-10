import { Router } from "express";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";

const router = Router()

router.post("/", UserController.register
    /* #swagger.requestBody = {schema: { $ref: '#/definitions/AddUser' } } */
    /* #swagger.responses[201] = {schema: {
        message: 'User created successfully',
        data: { $ref: '#/definitions/User' }
    } } */
)

router.get("/", UserController.getAll
    /* #swagger.responses[200] = {schema: { $ref: '#/definitions/UserArray' } } */
)

router.get("/:userId", UserController.getById
    /* #swagger.responses[200] = {schema: { $ref: '#/definitions/User' } } */
)

router.put("/:userId", UserController.update)
router.delete("/:userId", UserController.delete)

export default router
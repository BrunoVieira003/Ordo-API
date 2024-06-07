import { Request, Response } from "express"
import NotFoundError from "../exceptions/NotFoundError"
import { StatusCodes } from "../types/StatusCodes"
import UserRepo from "../repository/UserRepo"

class UserController{
    async register(req: Request, res: Response){
        const { username, email, password } = req.body

        try{
            const user = await UserRepo.register(username, email, password)
            return res.status(StatusCodes.OK).send({
                message: "User created successfully",
                data: user
            })
        }catch(error){
            return res.status(StatusCodes.SERVER_ERROR).send({
                message: "Something went wrong when creating user",
            })
        }
    }
}

export default new UserController
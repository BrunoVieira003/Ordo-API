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

    async getAll(req: Request, res: Response){
        try{
            const users = await UserRepo.getAll()
            return res.status(StatusCodes.OK).send({
                message: "Successfully fetched users",
                data: users
            })
        }catch(error){
            return res.status(StatusCodes.SERVER_ERROR).send({
                message: "Something went wrong when fetching users",
            })
        }
    }

    async getById(req: Request, res: Response){
        try{
            const { userId } = req.params
            const user = await UserRepo.getById(parseInt(userId))
            return res.status(StatusCodes.OK).send({
                message: "Successfully fetched user",
                data: user
            })
        }catch(error){
            if(error instanceof NotFoundError){
                return res.status(StatusCodes.NOT_FOUND).send({
                    message: error.message
                })
            }else{
                return res.status(StatusCodes.SERVER_ERROR).send({
                    message: "Something went wrong when fetching the user",
                })
            }
        }
    }
}

export default new UserController
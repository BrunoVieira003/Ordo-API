import { Request, Response } from "express";
import UserRepo from "../repository/UserRepo";
import { generateToken, passwordMatches } from "../services/auth";
import NotFoundError from "../exceptions/NotFoundError";
import { StatusCodes } from "../types/StatusCodes";

class AuthController{
    async login(req: Request, res: Response){
        const {email, password} = req.body

        try{
            const user = await UserRepo.getByEmail(email)
            if(passwordMatches(password, user.password)){
                const tokenData = generateToken({id: user.id})
                return res.status(200).send({
                    message: "Successfully logged in",
                    data: tokenData
                })
            }

        }catch(error){
            console.log(error)
            return res.status(401).send({
                message: "Email or password is invalid"
            })
        }
    }
}

export default new AuthController
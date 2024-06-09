import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../types/StatusCodes";
import { verify } from "jsonwebtoken";
import RequestWithUser from "../types/RequestWithUser";

const secret = process.env.JWT_SECRET || 'secret'

export default function auth(req: RequestWithUser, res: Response, next: NextFunction){
    try{
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Authentication token is missing' })
        }

        const decoded = verify(token, secret)
        req.user = decoded
        
        next()
    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bad Request" })
    }
}
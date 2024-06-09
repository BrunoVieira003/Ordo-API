import { Request } from "express";
import { User } from "../models/User";
import { JwtPayload } from "jsonwebtoken";

interface RequestWithUser extends Request{
    user?: User | JwtPayload | string
}

export default RequestWithUser
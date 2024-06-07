import { Request, Response } from "express"
import NotFoundError from "../exceptions/NotFoundError"
import { Task } from "../models/Task"
import TaskRepo from "../repository/TaskRepo"
import { StatusCodes } from "../types/StatusCodes"

class TaskController{
    async register(req: Request, res: Response){
        const { title } = req.body
        const status = req.body.status || 'pending'

        try{
            const task = await TaskRepo.register(title, status)
            return res.status(StatusCodes.OK).send({
                message: "Task created successfully",
                data: {
                    id: task.id,
                    title: task.title,
                    status: task.status
                }
            })
        }catch(error){
            return res.status(StatusCodes.SERVER_ERROR).send({
                message: "Something went wrong when creating task",
            })
        }
    }

    async getAll(req: Request, res: Response){
        try{
            const tasks = await TaskRepo.getAll()
            return res.status(StatusCodes.OK).send({
                message: "Successfully fetched tasks",
                data: tasks
            })
        }catch(error){
            return res.status(StatusCodes.SERVER_ERROR).send({
                message: "Something went wrong when fetching tasks",
            })
        }
    }

    async getById(req: Request, res: Response){
        try{
            const { taskId } = req.params
            const task = await TaskRepo.getById(parseInt(taskId))
            return res.status(StatusCodes.OK).send({
                message: "Successfully fetched tasks",
                data: task
            })
        }catch(error){
            if(error instanceof NotFoundError){
                return res.status(StatusCodes.NOT_FOUND).send({
                    message: error.message
                })
            }else{
                return res.status(StatusCodes.SERVER_ERROR).send({
                    message: "Something went wrong when fetching the task",
                })
            }
        }
    }

    async update(req: Request, res: Response){
        try{
            const { taskId } = req.params
            const { title } = req.body

            const task = new Task()
            task.id = parseInt(taskId)
            task.title = title
            await TaskRepo.update(task)
            return res.status(StatusCodes.OK).send({
                code: StatusCodes.OK,
                message: "Succefully updated task",
            })
        }catch(error){
            if(error instanceof NotFoundError){
                return res.status(StatusCodes.NOT_FOUND).send({
                    code: StatusCodes.NOT_FOUND,
                    message: error.message
                })
            }else{
                return res.status(StatusCodes.SERVER_ERROR).send({
                    code: StatusCodes.SERVER_ERROR,
                    message: "Something went wrong when updating the task",
                })
            }
        }
    }

    async delete(req: Request, res: Response){
        try{
            const { taskId } = req.params
            await TaskRepo.delete(parseInt(taskId))
            return res.status(StatusCodes.OK).send({
                code: StatusCodes.OK,
                message: "Succefully deleted task",
            })
        }catch(error){
            if(error instanceof NotFoundError){
                return res.status(StatusCodes.NOT_FOUND).send({
                    code: StatusCodes.NOT_FOUND,
                    message: error.message
                })
            }else{
                return res.status(StatusCodes.SERVER_ERROR).send({
                    code: StatusCodes.BAD_REQUEST,
                    message: "Something went wrong when deleting the task",
                })
            }
        }
    }
}

export default new TaskController
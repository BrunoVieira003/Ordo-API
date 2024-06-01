import NotFoundError from "../exceptions/NotFoundError"
import { Task } from "../models/Task"
import TaskRepo from "../repository/TaskRepo"
import { StatusCodes } from "../types/StatusCodes"

class TaskController{
    async register(req, res){
        const { title, status } = req.body

        try{
            const task = await TaskRepo.register(title, status)
            return res.status(StatusCodes.OK).send({
                code: StatusCodes.OK,
                message: "Succefully created task",
                task: {
                    title: task.title,
                    status: task.status
                }
            })
        }catch(error){
            return res.status(StatusCodes.SERVER_ERROR).send({
                code: StatusCodes.SERVER_ERROR,
                message: "Something went wrong with register task",
            })
        }
    }

    async getAll(req, res){
        try{
            const tasks = await TaskRepo.getAll()
            return res.status(StatusCodes.OK).send({
                code: StatusCodes.OK,
                message: "Succefully fetched tasks",
                tasks: tasks
            })
        }catch(error){
            return res.status(StatusCodes.SERVER_ERROR).send({
                code: StatusCodes.SERVER_ERROR,
                message: "Something went wrong with getAll tasks",
            })
        }
    }

    async getById(req, res){
        try{
            const { taskId } = req.params
            const task = await TaskRepo.getById(parseInt(taskId))
            return res.status(StatusCodes.OK).send({
                code: StatusCodes.OK,
                message: "Succefully fetched tasks",
                task: task
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
                    message: "Something went wrong with getById task",
                })
            }
        }
    }

    async update(req, res){
        try{
            const { taskId } = req.params
            const { title } = req.body

            const task = new Task()
            task.id = taskId
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
                    message: "Something went wrong with update task",
                })
            }
        }
    }

    async delete(req, res){
        try{
            const { taskId } = req.params
            await TaskRepo.delete(taskId)
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
                    message: "Something went wrong with delete task",
                })
            }
        }
    }
}

export default new TaskController
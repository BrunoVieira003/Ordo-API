import NotFoundError from "../exceptions/NotFoundError"
import Task from "../models/Task"
import TaskRepo from "../repository/TaskRepo"

class TaskController{
    async register(req, res){
        const { title } = req.body

        try{
            const task = await TaskRepo.register(title)
            return res.status(200).send({
                status_code: 200,
                message: "Succefully created task",
                task: {
                    title: task.title
                }
            })
        }catch(error){
            return res.status(500).send({
                status_code: 500,
                message: "Something went wrong with register task",
            })
        }
    }

    async getAll(req, res){
        try{
            const tasks = await TaskRepo.getAll()
            return res.status(200).send({
                status_code: 200,
                message: "Succefully fetched tasks",
                tasks: tasks
            })
        }catch(error){
            return res.status(500).send({
                status_code: 500,
                message: "Something went wrong with getAll tasks",
            })
        }
    }

    async getById(req, res){
        try{
            const { taskId } = req.params
            const task = await TaskRepo.getById(parseInt(taskId))
            return res.status(200).send({
                status_code: 200,
                message: "Succefully fetched tasks",
                task: task
            })
        }catch(error){
            if(error instanceof NotFoundError){
                return res.status(404).send({
                    status_code: 404,
                    message: error.message
                })
            }else{
                return res.status(500).send({
                    status_code: 500,
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
            return res.status(200).send({
                status_code: 200,
                message: "Succefully updated task",
            })
        }catch(error){
            if(error instanceof NotFoundError){
                return res.status(404).send({
                    status_code: 404,
                    message: error.message
                })
            }else{
                return res.status(500).send({
                    status_code: 500,
                    message: "Something went wrong with update task",
                })
            }
        }
    }

    async delete(req, res){
        try{
            const { taskId } = req.params
            await TaskRepo.delete(taskId)
            return res.status(200).send({
                status_code: 200,
                message: "Succefully deleted task",
            })
        }catch(error){
            if(error instanceof NotFoundError){
                return res.status(404).send({
                    status_code: 404,
                    message: error.message
                })
            }else{
                return res.status(500).send({
                    status_code: 500,
                    message: "Something went wrong with delete task",
                })
            }
        }
    }
}

export default new TaskController
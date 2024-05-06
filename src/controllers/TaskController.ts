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
                    title: task.dataValues.title
                }
            })
        }catch(error){
            return res.status(500).send({
                status_code: 500,
                message: "Something went wrong with register",
            })
        }
    }
}

export default new TaskController
import NotFoundError from "../exceptions/NotFoundError";
import Task from "../models/Task";

interface ITaskRepo{
    register(title: string): Promise<Task>
    getAll(): Promise<Task[]>
    getById(id: number): Promise<Task>
    update(task: Task): Promise<void>
}

class TaskRepo implements ITaskRepo{
    async register(title: string) {
        return await Task.create(
            {
                title: title
            })
    }
    async getAll(): Promise<Task[]> {
        return await Task.findAll()
    }
    async getById(id: number): Promise<Task> {
        const task = await Task.findByPk(id)
        if(task) return task
        else throw new NotFoundError(`Task with id ${id} was not found`)
    }
    async update(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new TaskRepo
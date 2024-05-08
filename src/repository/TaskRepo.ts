import database from "../db";
import NotFoundError from "../exceptions/NotFoundError";
import Task from "../models/Task";

interface ITaskRepo{
    register(title: string): Promise<Task>
    getAll(): Promise<Task[]>
    getById(id: number): Promise<Task>
    update(task: Task): Promise<void>
}

class TaskRepo implements ITaskRepo{
    private repo = database.getRepository(Task)
    async register(title: string) {
        const newTask = this.repo.create({title: title})
        await this.repo.save(newTask)
        return newTask
    }
    async getAll(): Promise<Task[]> {
        return await this.repo.find()
    }
    async getById(id: number): Promise<Task> {
        const task = await this.repo.findOneBy({id: id})
        if(task) return task
        else throw new NotFoundError(`Task with id ${id} was not found`)
    }
    async update(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new TaskRepo
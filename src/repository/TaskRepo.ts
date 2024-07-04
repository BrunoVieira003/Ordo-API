import dataSource from "../db";
import NotFoundError from "../exceptions/NotFoundError";
import { Task, TaskStatus } from "../models/Task";

interface ITaskRepo{
    register(title: string, status: TaskStatus, dueDate?: Date): Promise<Task>
    getAll(): Promise<Task[]>
    getById(id: number): Promise<Task>
    update(task: Task): Promise<void>
    delete(id: number): Promise<void>
}

class TaskRepo implements ITaskRepo{
    private repo = dataSource.getRepository(Task)
    async register(title: string, status: TaskStatus, dueDate?: Date) {
        const newTask = this.repo.create({
            title: title,
            status: status,
            dueDate: dueDate
        })
        await this.repo.save(newTask)
        return newTask
    }

    async getAll(): Promise<Task[]> {
        return await this.repo.find()
    }

    async getById(id: number): Promise<Task> {
        const task = await this.repo.findOneBy({id: id})
        if(task) return task
        else throw new NotFoundError(`Task with id ${id} not found`)
    }
    
    async update(task: Task): Promise<void> {
        const oldTask = await this.repo.findOneBy({id: task.id})

        if(oldTask){
            console.log(task)
            await this.repo.update(task.id, task)
        }else{
            throw new NotFoundError(`Task with id ${task.id} not found`)
        }
    }

    async delete(id: number): Promise<void>{
        const oldTask = await this.repo.findOneBy({id: id})

        if(oldTask){
            await this.repo.delete(id)
        }else{
            throw new NotFoundError(`Task with id ${id} not found`)
        }
    }
}

export default new TaskRepo
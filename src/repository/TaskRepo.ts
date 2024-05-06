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
        throw new Error("Method not implemented.");
    }
    async getById(id: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    async update(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new TaskRepo
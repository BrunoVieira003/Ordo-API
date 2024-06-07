import dataSource from "../db";
import NotFoundError from "../exceptions/NotFoundError";
import { User } from "../models/User";
import bcrypt from 'bcrypt'

interface IUserRepo{
    register(username: string, email: string, password: string): Promise<User>
    getAll(): Promise<User[]>
    getById(id: number): Promise<User>
    update(user: User): Promise<void>
    delete(id: number): Promise<void>
}

class UserRepo implements IUserRepo{
    private repo = dataSource.getRepository(User)

    async register(username: string, email: string, password: string) {
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = this.repo.create({
            username: username,
            email: email,
            password: hashPassword
        })
        await this.repo.save(newUser)
        delete newUser.password
        return newUser
    }

    async getAll(): Promise<User[]> {
        return await this.repo.find({select: ['id', 'username', 'email', 'created_at', 'updated_at']})
    }
    async getById(id: number): Promise<User> {
        const user = await this.repo.findOneBy({id: id})
        if(user){
            delete user.password
            return user
        }
        else throw new NotFoundError(`User with id ${id} not found`)
    }
    update(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export default new UserRepo
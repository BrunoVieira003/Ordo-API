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
    async update(user: User): Promise<void> {
        const oldUser = await this.repo.findOneBy({id: user.id})

        if(oldUser){
            await this.repo.update(user.id, user)
        }else{
            throw new NotFoundError(`User with id ${user.id} not found`)
        }
    }
    async delete(id: number): Promise<void> {
        const oldUser = await this.repo.findOneBy({id: id})

        if(oldUser){
            await this.repo.delete(id)
        }else{
            throw new NotFoundError(`User with id ${id} not found`)
        }
    }

}

export default new UserRepo
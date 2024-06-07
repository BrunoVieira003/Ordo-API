import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

type TaskStatus = "pending" | "inprogress" | "completed" | "archived"

@Entity()
class Task{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    title: string

    @Column({default: "pending"})
    status: TaskStatus

    @Column({nullable: true})
    dueDate: Date | null

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export {Task}
export type {TaskStatus}
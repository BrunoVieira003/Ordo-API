import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

type TaskStatus = "inactive" | "ongoing" | "finished"

@Entity()
class Task{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    title: string

    @Column({default: "inactive"})
    status: TaskStatus

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export {Task}
export type {TaskStatus}
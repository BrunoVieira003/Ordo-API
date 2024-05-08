import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Task{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    title: string
}

export default Task
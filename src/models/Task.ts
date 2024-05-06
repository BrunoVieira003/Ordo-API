import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db";

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task> >{
    id: number;
    title: string;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
    },
    {sequelize}
);

export default Task
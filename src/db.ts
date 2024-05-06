import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: "postgres",
    database: 'ordo',
    username: 'postgres',
    password: 'admin',
})

export default sequelize
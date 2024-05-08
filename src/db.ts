import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import Task from './models/Task'

dotenv.config()

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [Task],
    synchronize: true,
    logging: true
})

dataSource.initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default dataSource
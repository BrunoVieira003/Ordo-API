import 'reflect-metadata'
import express, { Express } from "express";
import dotenv from "dotenv";
import InfoRoutes from './routes/InfoRouter';
import UserRoutes from './routes/UserRouter'
import TaskRoutes from './routes/TaskRouter';
import cors from 'cors'
import dataSource from './db'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(InfoRoutes)
app.use('/users', UserRoutes)
app.use('/tasks', TaskRoutes)

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
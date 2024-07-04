import 'reflect-metadata'
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import routes from './routes/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes)

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
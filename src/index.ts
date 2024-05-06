import express, { Express } from "express";
import dotenv from "dotenv";
import InfoRoutes from './routes/info';
import cors from 'cors'
import database from './db'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
(async ()=>{
  await database.sync()
})();

// Routes
app.use(InfoRoutes)

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
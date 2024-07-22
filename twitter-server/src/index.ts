import express, { Application } from "express";
import * as dotenv from "dotenv";
import { initServer } from "./app";
import cors from "cors";
const app: Application = express();

dotenv.config();

app.use(cors());

async function init() {
    const app = await initServer();
    app.listen(8000, () => console.log(`Server Started at PORT:8000`));
}

init();

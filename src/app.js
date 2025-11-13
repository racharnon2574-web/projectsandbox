import express from "express";
import authRouter from "./routes/auth.route.js";
import cors from "cors"
import dotenv from "dotenv"
import notFoundMidelleware from "./middlewares/notFound.midelleware.js";
import lessonRouter from "./routes/lesson.route.js";

const FRONTEND_URL = process.env.FRONTEND_URL

const app = express()

app.use(cors({
    origin: `${FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/lesson', lessonRouter);

app.use(notFoundMidelleware);

export default app;
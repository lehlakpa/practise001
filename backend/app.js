import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
const app = express();
app.use(cookieParser());
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static("public"));

import userRouter from "./Routes/userRoutes.js";

app.use("/api/v1/users", userRouter);
export default app; 





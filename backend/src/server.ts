import express, { Request, Response } from 'express';
import userAuth from './auth/user.auth'
import connectToDb from './config/connectToDb';
import cors from "cors";
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import service from './routes/service.routes'
dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended : false}));
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true,
}))

app.use(cookieParser());

const PORT = process.env.PORT || 3000;


connectToDb();

app.get("/", (req : Request, res : Response) => {
    res.json("hello ts");
})

app.use("/auth", userAuth);
app.use("/api", service);

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
})
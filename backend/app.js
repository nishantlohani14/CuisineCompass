import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

//NOTE-upar hr file m .js connection dena coz type:module in package.json

const app = express();
dotenv.config({ path: "./config/config.env" });

//ye app.use k andar jitni bhi chize h sb middlewares h
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

//express.json->jo string denge usko json form m convert krne k loye
app.use(express.json());

//data kis type ka hona chahiye
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

export default app;
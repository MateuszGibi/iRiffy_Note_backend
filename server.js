import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";
import logoutRoute from "./routes/logout.js";
import dataRoute from "./routes/data.js";

mongoose.connect("mongodb://localhost:27017/iRiffyNote");


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/data", dataRoute);

app.listen(process.env.PORT, () => console.log("Listening on port: " + process.env.PORT));
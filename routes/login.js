import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import userModel from "../models/userModel.js";



const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
    
    const userLogin = req.body.userLogin;
    const userPassword = req.body.userPassword;

    if(userLogin == "" || userPassword == '' || userLogin == null || userPassword == null){
        return res.status(400).send("Login and password are required!");
    }

    const user = await userModel.findOne({ userLogin: userLogin});

    if(!user) return res.status(400).send("Invalid login or password!");
    if(! await bcrypt.compare(userPassword, user.userPassword)) return res.status(400).send("Invalid login or password!");
    
    const jwtPayload = {
        userId: user._id,
        userLogin: user.userLogin
    }

    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: "24h"});
    res.cookie("AccessToken", accessToken);

    res.status(200).send({accessToken: accessToken});
})

export default loginRoute;
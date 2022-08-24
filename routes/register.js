import express  from "express";
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";



const registerRoute = express.Router();

registerRoute.post("/", async (req, res) => {
    
    const userLogin = req.body.userLogin;
    let userPassword = req.body.userPassword;
    
    if(userLogin == '' || userPassword == '' || userLogin == null || userPassword == null){
        return res.status(400).send("Login and pasword are required!");
    }

    userPassword = await bcrypt.hash(userPassword, 10);

    if(await userModel.findOne({userLogin: userLogin})){
        return res.status(400).send("This login is already in use!");
    }

    const newUser = {
        userLogin: userLogin,
        userPassword: userPassword
    }

    await userModel.create(newUser);

    res.status(200).send("Registration completed");
})

export default registerRoute;
import express from "express"
import jwt from "jsonwebtoken"

import auth from "../middleware/auth.js";
import dataModel from "../models/dataModel.js";

const dataRoute = express.Router();

dataRoute.get("/", auth, async (req, res) => {

    const accessToken = req.cookies.AccessToken;
    const jwtPayload = jwt.decode(accessToken);

    const userId = jwtPayload.userId;
    const userData = await dataModel.findOne({userId: userId});
    
    if(userData == null) return res.status(400).send("No data has been found");

    res.status(200).send(userData.userData);
})

dataRoute.post("/", auth, async (req, res) => {

    const accessToken = req.cookies.AccessToken;
    const userData = req.body.userData;

    if(!Array.isArray(userData)) return res.status(403).send("Data is required");
    
    const jwtPayload = jwt.decode(accessToken);
    const userId = jwtPayload.userId;

    const data = await dataModel.findOne({userid: userId});

    if(data == null){
        dataModel.create( { userId: userId, userData: userData} );
        return res.status(200).send("Created new data");
    }

    await dataModel.updateOne({userId: userId}, {userData: Array.from(userData)});
    res.status(200).send("Data has been updated");

})

export default dataRoute;
import express from "express";
import auth from "../middleware/auth.js";

const logoutRoute = express.Router();

logoutRoute.delete("/", auth,  async (req, res) => {

    const accessToken = req.cookies.AccessToken;

    if(accessToken == '' || accessToken == null) return res.status(403).send("Access denied!");


    res.clearCookie("AccessToken");
    res.status(200).send("Logged out");
})

export default logoutRoute
import jwt from "jsonwebtoken"


function auth(req, res, next){
    const accessToken = req.cookies.AccessToken;

    if(accessToken == '' || accessToken == null) return res.status(403).send("Access denied");

    try{
        jwt.verify(accessToken, process.env.JWT_SECRET);
    }
    catch(err){
        return res.status(403).send("Access denied!")
    }

    next()
}

export default auth;
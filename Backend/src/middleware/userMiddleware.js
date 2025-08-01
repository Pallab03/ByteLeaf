const jwt = require('jsonwebtoken');
const User = require('../models/user');
const redisClient = require('../config/redis');

//validate Token
const userMiddleware = async (req,res,next)=>{
    try{    
        const {token}=req.cookies;
        if(token)
            console.log("token present:",token)
        if(!token){
            console.log("No token found")
            throw new Error("token Is not present .")
        }

        const payload= jwt.verify(token,process.env.JWT_KEY);

        const {_id}= payload;

        if(!_id)
            throw new Error("Invalid token .");

        const result = await User.findById(_id);

        if(!result)
            throw new Error("User Doesn't Exist ");

        //chek token was already exist or not 
        const IsBlocked= await redisClient.exists(`token:${token}`);

        if(IsBlocked){
            throw new Error("Token Blocked");
        }


        req.result= result;

        next();
        
    }catch(err){
        res.status(401).send("Server Error in user MiddleWare :"+err)
    }
}

module.exports= userMiddleware;

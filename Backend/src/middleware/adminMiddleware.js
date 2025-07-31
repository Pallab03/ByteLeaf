const jwt = require('jsonwebtoken');
const User = require('../models/user');
const redisClient = require('../config/redis');

//validate Token
const adminMiddleware = async (req,res,next)=>{
    try{    
        const {token}=req.cookies;
        if(!token)
            throw new Error("Token Is not present .")

        const payload= jwt.verify(token,process.env.JWT_KEY);

        const {_id}= payload;

        if(!_id)
            throw new Error("Invalid token .");
        
        const result = await User.findById(_id);

        //check user was admin or not
        if(payload.role!="admin")
        {
            throw new Error("Access Denied.")
        }

        

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
        res.status(401).send("Error :"+err)
    }
}

module.exports= adminMiddleware;
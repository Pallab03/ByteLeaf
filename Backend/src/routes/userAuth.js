const express= require('express');
const authRouter= express.Router();

const {login,register,logout,adminRegister, deleteProfile,
     getAllUser, deleteUser, verifyEmail, forgotPassword,
     resetPassword}= require('../controllers/userAuthen');
     
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

//Register
//login
//logout
//Get Profile
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/verify-email',verifyEmail);
authRouter.post('/forgot-password',forgotPassword);
authRouter.post('/reset-password/:token',resetPassword);
authRouter.get("/getAllUser", userMiddleware,getAllUser);
authRouter.post('/admin/register',adminMiddleware,adminRegister);
authRouter.delete("/admin/deleteUser/:id",adminMiddleware,deleteUser);
authRouter.delete('/deleteProfile',userMiddleware,deleteProfile);

authRouter.get('/check',userMiddleware,(req,res)=>{
    try{
        const reply ={
        firstName:req.result.firstName,
        emailId:req.result.emailId,
        _id:req.result._id,
        role:req.result.role,
    }
        res.status(200).json({
            user:reply,
            message:"valid User"
        });
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})
// authRouter.get('getProfile',getProfile);

module.exports= authRouter;
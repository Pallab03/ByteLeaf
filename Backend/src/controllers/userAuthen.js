const redisClient = require('../config/redis');
const Submission = require('../models/submission');
const User = require('../models/user');
const validate = require('../utils/validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail } = require('../sendmail/email');
const crypto = require('crypto');
const path = require('path');
const validator = require('validator')
//register
const register = async (req, res) => {
    try {

        //validate the data
        validate(req.body);

        const { emailId, firstName, password } = req.body;
        const userAlreadyExists = await User.findOne({ emailId });


        if (userAlreadyExists) {
            if (!userAlreadyExists.isVerified) {
                await User.deleteOne({ emailId }); //  clear old non verivied user
                
            }
            else {
                
                return res.status(400).send("User already exists");
            }
        }

        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user'

        //generate email verification code

        const buffer = crypto.randomBytes(3);
        const number = buffer.readUIntBE(0, 3) % 1000000;

        const verifyCode = number.toString().padStart(6, '0');

        req.body.verificationToken = verifyCode;
        req.body.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        //create user
        const user = await User.create(req.body);
        //genarate jwt token

        // Set cookie with just email (JWT or plain)
        const emailToken = jwt.sign({ emailId: emailId }, process.env.JWT_EMAIL_VERIFY_KEY, { expiresIn: '10m' });

        //send user a verification code
        await sendVerificationEmail(emailId,user.verificationToken);

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role,
            isVerified: user.isVerified,
        }


        //send email verify cookies
        res.cookie('verifyEmail', emailToken, {
            httpOnly: true,
            path: '/user/verify-email', //only access in verify-email path
            maxAge: 10 * 60 * 1000,
        });

        res.status(201).json({
            user: reply,
            message: "User Register Successfully"
        });

    }
    catch (err) {
        res.status(400).send("" + err.message);
    }
}

//verify Email-Id
const verifyEmail = async (req, res) => {
    const { code } = req.body
    const emailToken = req.cookies.verifyEmail;

    if (!emailToken)
        return res.status(403).send('Session expired. Please sign up again');
    
    try {

        const { emailId } = jwt.verify(emailToken, process.env.JWT_EMAIL_VERIFY_KEY);

        const user = await User.findOne({
            emailId: emailId,
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }  //check the token was expired or not
        })

        if (!user)
            return res.status(400).json({ success: false, message: "Invalid or Expeired verification Code", emailId: emailId })
        //genarate jwt token
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: 'user' }, process.env.JWT_KEY, { expiresIn: '1d'})

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();//update the value

        //optional Welcome Email
        // await sendWelcomeEmail(user.emailId, user.firstName);

        //send cookies
        res.cookie('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.clearCookie('verifyEmail', { path: '/user/verify-email' }); //clear the old cookie
        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role,
            isVerified: user.isVerified,
        }



        res.status(201).json({
            user: reply,
            message: "User Register Successfully"
        });

    } catch (err) {
        res.status(400).send("Error for Sending VerifyEmail :" + err);
    }
}

//login
const login = async (req, res) => {
    try {

        const { emailId, password } = req.body;


        if (!emailId)
            throw new Error("Invalid Credentials");
        if (!password)
            throw new Error("Invalid Credentials");

        const user = await User.findOne({ emailId });
        if (!user)
            throw new Error("Invalid Credentials");

        if (!user.isVerified)
            throw new Error("Invalid Credentials");

        const match = await bcrypt.compare(password, user.password);
        

        if (!match)
            throw new Error("Invalid Credentials");

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role,
        }

        //genarate token and set cookie for user        
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 //max age 1 day
        });

        res.status(201).json({
            user: reply,
            message: "User Login Successfully"
        })

    }
    catch (err) {
        res.status(401).send("Error :" , err);
    }
}

//logout
const logout = async (req, res) => {

    try {
        const { token } = req.cookies;
        const payload = jwt.decode(token)

        await redisClient.set(`token:${token}`, "Bloked");
        await redisClient.expireAt(`token:${token}`, payload.exp);

        //deleted Cookie
        res.cookie("token", null, { expires: new Date(Date.now()) })
        //or
        // res.clearCookie("token");
        res.send("logout Sucessfully")

    }
    catch (err) {
        res.status(501).send("Error :" + err);
    }
}

//forgot password
const forgotPassword = async (req, res) => {
    const { emailId } = req.body;
    

    try {
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(400).json({ success: false, message: "user not Found" });
        }
        

        //genarate ResetPass token using Crypto
        const resetVerifyCode = crypto.randomBytes(20).toString("hex");


        user.resetPasswordToken = resetVerifyCode;
        user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;// valid 1 hours

        await user.save();

        //send rest Password email
        // await sendResetPasswordEmail(emailId,user.resetPasswordToken);
        await sendResetPasswordEmail(emailId, `http://localhost:5173/reset-password/${user.resetPasswordToken}`);
        res.status(200).json({ success: true, message: "Password reset link send your Email " })
    }
    catch (err) {
        res.status(400).send({ success: false, message: err.message });
    }
}

//reset password
const resetPassword = async (req, res) => {

    const { token } = req.params;
    
    try {
        
        const { password } = req.body;
        
        if(!validator.isStrongPassword(password))
            throw new Error("Password is Not Strong Enough");

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user)
            return res.status(400).json({ success: false, message: "Invalid or Expeired verification Code" })
        //update the password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordExpiresAt = undefined;
        user.resetPasswordToken = undefined;
        await user.save();

        //send Reset password success email
        await sendResetSuccessEmail(user.emailId);

        res.status(200).json({ success: true, message: "Password reset SuccessFully " })



    } catch (err) {
        res.status(400).send({ success: false, message: err.message });
    }
}

//adminRegister

const adminRegister = async (req, res) => {
    try {

        //validate the data
        validate(req.body);

        const { emailId, firstName, password } = req.body;

        req.body.password = await bcrypt.hash(password, 10);
        // req.body.role='admin'

        const user = await User.create(req.body);
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 })

        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(201).send("User Register SuccessFully.");

    }
    catch (err) {
        res.status(400).send("Error :" + err);
    }
}
//get All User

const getAllUser = async (req, res) => {
    try {

        const getAllUser = await User.find({}).select('_id firstName lastName role problemSolved emailId');
        if (getAllUser.length == 0)
            return res.status(404).send("No User Exist");

        res.status(200).send(getAllUser);

    }
    catch (err) {
        res.status(500).send("Error: " + err);

    }
}

//delete perticuler User by admin

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(400).send("Id is Missing !")
        }
        //delete user In userSchema 
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser)
            return res.status(400).send("User isn't Valid or user already Deleted");

        //delete user in SubmissionSchema
        await Submission.deleteMany({ userId: id });
        res.status(200).send("Profile deleted successfully.")
    } catch (err) {
        rse.status(400).send("Internal Server Error for Deleting User :" + err);
    }
}

//deleted user profile
const deleteProfile = async (req, res) => {
    try {

        //deleted in UserSchema
        const userId = req.result._id;
        await User.findByIdAndDelete(userId);

        //deletd in SubmissionSchema
        await Submission.deleteMany({ userId });
        res.status(200).send("Profile deleted successfully.")


    } catch (err) {
        res.status(500).send("Internal server Error :" + err);
    }
}

module.exports = { register, login, logout, adminRegister, deleteProfile, getAllUser, deleteUser, verifyEmail, forgotPassword, resetPassword };

const transporter  = require("../config/nodemailer");
const { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates");

const sendVerificationEmail =async (emailId,verificationToken)=>{
    try{
        const response = await transporter.sendMail({
            from: '"ByteLeaf" <pallabdevcode@gmail.com>',
            to: emailId,
            subject: "Verify Your Email",
            text: "Verify Code", // plain‑text body
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken), // HTML body
            
        });
        
    }catch(err)
    {
        
        throw new Error(` Error ! Sending Verification Email: ${err}`)
    }
}

const sendWelcomeEmail =  async (emailId,firstName)=>{
    try{
        const response = await transporter.sendMail({
            from: '"ByteLeaf" <pallabdevcode@gmail.com>',
            to: emailId,
            subject: "Wellcome to ByteLeaf",
            text: "Welcome Email", // plain‑text body
            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}",firstName), // HTML body
        });
        
    }catch(err)
    {
        
        throw new Error(` Error ! Sending Welcome Email: ${err}`)
    }
}

const sendResetPasswordEmail = async(emailId,resetURL)=>{
    try{
        const response = await transporter.sendMail({
            from: '"ByteLeaf" <pallabdevcode@gmail.com>',
            to: emailId,
            subject: "Reset Your Password",
            text: "Verify Code", // plain‑text body
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL), // HTML body
        });
    }catch(err)
    {
        throw new Error(` Error ! Sending Reset Password Email: ${err}`)
    }
}

const sendResetSuccessEmail = async (emailId)=>{
    try{
        const response = await transporter.sendMail({
            from: '"ByteLeaf" <pallabdevcode@gmail.com>',
            to: emailId,
            subject: "Reset password Successful",
            text: "Verify Code", // plain‑text body
            html: PASSWORD_RESET_SUCCESS_TEMPLATE, // HTML body
        });
    }catch(err)
    {
        throw new Error(` Error ! Sending Reset Password success Email: ${err.message}`)
    }

}
module.exports={sendVerificationEmail,sendWelcomeEmail,sendResetPasswordEmail,sendResetSuccessEmail};
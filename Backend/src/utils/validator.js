const validator = require('validator')

const validate= (data)=>{
    
    const mandatoryField= ['emailId','firstName','password'];
    //check for mandatory field is exist or Not
    const IsAllowed= mandatoryField.every((k)=> Object.keys(data).includes(k));
    if(!IsAllowed){
        throw new Error("Field Missing");
    }
    
    //checking for Email is Valid or Not
    if(!validator.isEmail(data.emailId))
        throw new Error("InValid Email");
     //checing for Strong PassWord
     if(!validator.isStrongPassword(data.password))
        throw new Error("Password is Not Strong Enough");
    
}

module.exports=validate
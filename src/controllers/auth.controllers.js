const userModel = require("../Models/user.Models");
const bcrypt = require("bcryptjs");
const JWT  = require("jsonwebtoken");
const emailService = require("../Services/Email.Services")
const tokenBlacklistModel = require("../Models/blackList.Models")
require("dotenv").config();

/** 
  *  userResister controller
  * POST : /api/auth/register
*/


async function userRegister(req,res){
   const {email,password,username} = req.body;
   const isExists = await  userModel.findOne({
    email:email
   })

   if(isExists){
    return res.status(422).json({
        message:"user is already exists with same email id",
        status:"failed"
    })
   }

   const user = await userModel.create({
    email,password,username
   })
  
   const token = JWT.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"3d"});
   res.cookie("token",token);

   res.status(201).json({
    message:"user registered successfully",
    _id:user._id,
    email:user.email,
    username:user.username,
    token
   })
   
   await emailService.sendRegistrationEmail(user.email,user.username);
}

/** 
  *  userLogin controller
  * POST : /api/auth/login
*/

async function userLogin(req,res){
   const {username,email,password} = req.body;

   const user = await userModel.findOne({email}).select("+password");

   if(!user){
    return res.status(401).json({
     message:"email or password is not valid",
    })
   }
  
   const isValidPassword  =  await user.comparePassword(password);
   if(!isValidPassword){
    return res.status(401).json({
      message:"Invalid credential"
    })
   }

   const token = JWT.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"3d"});
   res.cookie("token",token);
   
   res.status(200).json({
    message: "user is logged in successfully",
    username: user.username,
    email:user.email
   })
}




/** 
  *  userResister controller
  * POST : /api/auth/logout
*/

async function userLogout(req,res){
    const token  = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(200).json({
        message:"User logged out successfully"
      })
    }

    res.cookie("token",""); // clear the token.
    await tokenBlacklistModel.create({
      token:token
    });
    
    
    res.clearCookie("token",""); // clear the token.


    return res.status(200).json({
      message:"user logged out successfully"
    })
}




module.exports = {userRegister,userLogin,userLogout};
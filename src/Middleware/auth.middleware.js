const userModel = require("../Models/user.Models");
const jwt = require("jsonwebtoken");
require("dotenv").config();


async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"unauthorized,token is missing"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.userId);
        req.user = user;
        return next();
    }
    catch(error){
        return res.status(401).json({
            message:"unauthorized, token is missing"
        })
    }
}

async function authSystemUserMiddleware(req,res,next){
  const token = req.cookies.token || req.headers.authorizations?.split(" ")[1];
  if(!token){
    return res.status(401).json({
        message:"Unauthorized access token missing",
    })
  }

  try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
     const systemUser = await userModel.findById(decoded.userId).select("+systemUser");

     if(!systemUser){
        return res.status(403).json({
            message:"forbidden access, you are not a systemUser"
        })
     }
     req.user = systemUser;
     return next();
  }
    catch(error){
        console.log("error in systemUser verification:",error);
        return res.status(401).json({
            message:"authorized access,token is in valid"
        })
    }

}

module.exports = {authMiddleware,authSystemUserMiddleware};
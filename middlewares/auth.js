const jwt=require("jsonwebtoken");
const User=require("../models/user-model");
const {jwtSecret} = require("../config/jwt.config");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(req.cookies)
  
    if (!token) {
      res.status(403).json({
          success:false,
          message:"login to access this resource"
      })
    }
  
    const decodedData = jwt.verify(token,jwtSecret);
  
    req.user = await User.findById(decodedData.id);
  
    next();
  };

exports.AuthorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                success:false,
                message:`Role: ${req.user.role} is not allowed to access this resource`
            })
        }
    }
}
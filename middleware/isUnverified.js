const User = require("../models/users")

const isUnverified = async (req,res,next)=>{
  const url = req.originalUrl;
  const index = url.lastIndexOf("/")
  const email = url.slice(index+1,url.length);
 
  const user = await User.findOne({
    email
  })
  
  if(!user){
    return res.status(400).json({"error":"User not found"})
  }
 
 if(user.isVerified){
   return res.status(403).redirect("/login");
 }else{
   return next()
 }
}

module.exports = isUnverified;
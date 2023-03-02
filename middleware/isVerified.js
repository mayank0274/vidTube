const User = require("../models/users")

async function isVerified(req,res,next){
  const email = req.body.email;
  const user = await User.findOne({email});
  
  if(!user){
    return res.status(400).json({"error":"User not found"})
  }
  
  if(user.isVerified){
    return next()
  }
  else{
  return  res.status(400).json({"error":"user not verified"})
  }
}

module.exports = isVerified;


function user(req,res,next){
  if(req.isAuthenticated() && req.user.isVerified){
    return next()
  }
  else{
  
  return  res.status(403).render("login")
  }
}

module.exports = user


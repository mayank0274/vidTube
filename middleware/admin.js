function admin(req,res,next){
  if(req.isAuthenticated() && req.user.isVerified && req.user.role=="admin"){
    return next()
  }
  else{
  
  return  res.status(403).render("login")
  }
}

module.exports = admin


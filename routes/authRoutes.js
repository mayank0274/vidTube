const authentication = require("../controllers/auth/authController");
const authVerification = require("../controllers/auth/authVerification");
const userController = require("../controllers/auth/userController");
const adminController = require("../controllers/admin/adminController");

// middlewares
const user = require("../middleware/user")
const admin = require("../middleware/admin")
const isUnverified = require("../middleware/isUnverified")
const isVerified = require("../middleware/isVerified")

// multer config
const uploadFields = require("../config/multerConfig")


const auth = (app) => {
  
  // login, registration routes
  app.get("/login", authentication().login);
  app.get("/register", authentication().register);
  app.post("/register", authentication().postregister);
  app.post("/login", authentication().loginuser);
  app.post("/logout",user,authentication().logout);

  // verification/reset password routes
  app.get("/verify/:email",isUnverified,authVerification().verifyEmailPage);
  
  app.post("/verify/:email",isUnverified, authVerification().verify);
  
  app.patch("/resendOtp/:email",isUnverified, authVerification().resendOtp);
  
  app.get("/forgotPassword", authVerification().forgotPasswordPage);

  app.patch("/forgotPasswordOtp",isVerified, authVerification().forgotPasswordOtp);

  app.patch("/updatePassword",isVerified, authVerification().updatePassword);
  
  
  // user routes -> after login 
  app.get("/user",user,userController().user);
  
  app.post("/upload",uploadFields,userController(). upload)
  
  app.get("/deleteVideo/:id",user,userController().deleteVideo)
  
  
  // admin routes
  app.get("/admin/reportedVideo",admin,adminController().reportedVideo);
  app.get("/admin/user/:id",admin,adminController().userDetails);
  app.delete("/admin/remove/:id",admin,adminController().terminateUser);
  app.get("/admin/allUsers",admin,adminController().getAllUsers);
  app.delete("/admin/handleReport/:id",admin,adminController().handleReport);
  
};

module.exports = auth;

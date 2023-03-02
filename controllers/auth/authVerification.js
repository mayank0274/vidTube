const User = require("../../models/users");
const otp = require("../../config/otpGen");
const sendEmail = require("../../config/nodemailer");
const bcrypt = require("bcryptjs");


function authVerification(){
  return{
    // verify email page
    verifyEmailPage : function(req,res){
      res.render("verify_otp",{
    email : req.params.email
  })
    },
    
     // verify user while registration
   verify : async function(req,res){
     const userEmail = req.params.email;
   
  const otp = req.body.otp;
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      req.flash("error", "User not found");
      return res.status(400).redirect(`/verify/${userEmail}`);
    }

    if (otp === user.otp) {
      const verifyUser = await User.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            isVerified: true,
          },
        },
        { new: true }
      );

      return res.status(200).render("login");
    } else {
      req.flash("error", "Incorrect otp entered");
      return res.status(400).redirect(`/verify/${userEmail}`);
    }
  } catch (err) {
    req.flash("error", "An unexpected error occurred while verifying user");
    return res.status(400).redirect(`/verify/${userEmail}`);
  }
   },
    //send otp again if not reached
   resendOtp : async function(req,res){
     const email = req.params.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const updateOtp = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          otp,
        },
      },
      { new: true }
    );

    const subject = "vidTube email verification";

    const response = await sendEmail(
      updateOtp.email,
      subject,
      updateOtp.otp,
      updateOtp.name
    );
    return res.status(200).json({ msg: response });
  } catch (err) {
    return res.status(400).json({ error: "Uncaught error occurred" });
  }
   },
   // forgot/ reset password page
   forgotPasswordPage : function(req,res){
     res.render("forgotPassword")
   },
    // send otp for reset password
    forgotPasswordOtp : async function(req,res){
      const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const updateOtp = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          otp,
        },
      },
      { new: true }
    );

    const subject = "vidTube Reset Password";

    const response = await sendEmail(
      updateOtp.email,
      subject,
      updateOtp.otp,
      updateOtp.name
    );
    return res.status(200).json({ msg: response });
  } catch (err) {
    return res.status(400).json({ error: "error in sending email" });
  }
    },
    
    // update new Password
    updatePassword : async function(req,res){
      const { email, password, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const secPassword = await bcrypt.hash(password, 10);
    if (otp === user.otp) {
      const verifyUser = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            password: secPassword,
          },
        },
        { new: true }
      );
      return res.status(200).json({ msg: "Password changed successfully" });
    } else {
      return res.status(400).json({ error: "Incorrect otp entered" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Uncaught error occured while verifying user" });
  }
    },
  }
}

module.exports = authVerification;
const User = require("../../models/users");
const otp = require("../../config/otpGen");
const sendEmail = require("../../config/nodemailer");
const passport = require("passport");
const bcrypt = require("bcryptjs");
function authentication() {
  return {
    //register page
    register: function (req, res, next) {
      return res.render("register");
    },

    // sending user data to db
    postregister: async function (req, res) {
      try {
        const user = await User.findOne({ email: req.body.email });

        if (user && !user.isVerified) {
          const updateOtp = await User.findOneAndUpdate(
            { _id: user._id },
            {
              $set: {
                otp,
              },
            },
            { new: true }
          );
          const subject = "vidTube email verification";
          await sendEmail(user.email, subject, user.otp, user.name);
          req.flash(
            "error",
            "Email alrady registered but not verified,follow instructions in email sent to you"
          );
          return res.redirect("/register");
        }

        if (user) {
          req.flash("error", "Email already registered");
          return res.redirect("/register");
        }

        const secPassword = await bcrypt.hash(req.body.password, 10);
        const userData = new User({
          name: req.body.name,
          email: req.body.email,
          password: secPassword,
          otp: otp,
        });

        const saveUser = await userData.save();

        // sending otp email
        const subject = "vidTube email verification";
        await sendEmail(saveUser.email, subject, saveUser.otp, saveUser.name);

        return res.status(200).redirect(`verify/${saveUser.email}`);
      } catch (err) {
        req.flash("error", "An unexpected error occurred");
        return res.redirect("/register");
      }
    },

    // login page
    login: function (req, res) {
      return res.render("login");
    },

    // login user
    loginuser: function (req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        // user not found
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        if (user.isVerified) {
          req.logIn(user, (err) => {
            if (err) {
              req.flash("error", info.message);
              return res.redirect("/login");
            }

            return res.redirect("/user");
          });
        } else {
          // user not verified
          req.flash(
            "error",
            "You must be verified to log in(Follow instructions send to your email while registration)"
          );
          return res.redirect("/login");
        }
      })(req, res, next);
    },
    logout : function(req,res){
      req.logout(()=>{})
      return res.redirect("/login")
    }
  };
}

module.exports = authentication;

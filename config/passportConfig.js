const localStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const initializePassport = (passport) => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User not found!!" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        
        if (comparePassword) {
          return done(null, user, {
            message: "Login successful redirecting...",
          });
        } else {
          return done(null, false, { message: "Invalid credentials entered" });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = initializePassport;

require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const ejs = require("ejs");
const expresslayout = require("express-ejs-layouts");
const path = require("path");

app.use(flash());
app.use(expresslayout);
// connecting db
require("./db/conn");

// response body config
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// view engine config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/"));
app.use(express.static("public"));
app.set("layout adminLayout", false);

// session config
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// passport config
const init = require("./config/passportConfig");
init(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=> {
  res.locals.session = req.session
  res.locals.user = req.user
  next();
})

/**************** routes ******************/
//authentication,profile routes
require("./routes/authRoutes")(app);

// video action routes
require("./routes/videoRoutes")(app);

  //default routes
  app.get('*',(req,res)=>{
    res.render("default");
  })
  
app.listen(port, () => {
  console.log(`server listen at ${port}`);
});

const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  otp : {
    type : String,
    required : true
  },
  isVerified : {
    type : Boolean,
    default : false
  },
  role : {
    type : String,
    default : "user"
  }
},{timestamps : true})

const User = mongoose.model("User",userSchema);

module.exports = User;
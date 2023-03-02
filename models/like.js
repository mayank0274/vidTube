const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({
  user : {
    type :mongoose.Schema.Types.ObjectId,
    ref :'User'
  },
  video : {
    type : String,
    required : true
  },
},{timestamps:true})

const Like = mongoose.model("Like",likeSchema)

module.exports = Like;
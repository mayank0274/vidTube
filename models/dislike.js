const mongoose = require("mongoose")

const disLikeSchema = mongoose.Schema({
  user : {
    type :mongoose.Schema.Types.ObjectId,
    ref :'User'
  },
  video : {
    type : String,
    required : true
  },
},{timestamps:true})

const Dislike = mongoose.model("Dislike",disLikeSchema)

module.exports = Dislike;
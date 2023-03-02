const mongoose = require("mongoose")

const reportSchema = mongoose.Schema({
  user : {
    type :mongoose.Schema.Types.ObjectId,
    ref :'User'
  },
  video : {
    type : String,
    required : true
  },
  authorId : {
    type :mongoose.Schema.Types.ObjectId,
    ref :'User'
  },
  authorName : {
    type : String,
    required : true
  },
  reportBy : {
    type : String,
    required : true
  },
},{timestamps:true})

const Report = mongoose.model("Report",reportSchema)

module.exports = Report;
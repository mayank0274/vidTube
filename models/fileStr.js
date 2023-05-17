const mongoose = require("mongoose");

const fileStr = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    videoName: {
      type: String,
      required: true,
    },
     author: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    videoPath: {
      type: String,
      required: true,
    },
    videoPathEJS: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
      required: true,
    },
    posterPathEJS: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
             {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Like"
       },
       
      ],
    dislikes:[
             {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Dislike"
       },
       
      ],
     report: [
       {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Report"
       },
       
       ],
      
    duration:{
      type:String
    },
    comments:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Commnet"
      }
      
      ]
  },
  { timestamps: true }
);

const FileData = mongoose.model("FileData", fileStr);

module.exports = FileData;

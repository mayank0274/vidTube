const mongoose = require("mongoose")

const commentsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  videoUUID: {
    //post uuid
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
  },
  replies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reply: String,
      author: String,
      date: String
    }
  ],
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentsSchema)

module.exports = Comment;
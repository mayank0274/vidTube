const Comment = require("../../models/comments");
const User = require("../../models/users");
const FileData = require("../../models/fileStr");
// find user name 
const findAUserNameById = async (id)=>{
  const user = await User.findOne({_id:id});
  return user.name;
}

const findVideoUUID = async (id)=>{
  const comment = await Comment.findOne({_id:id});
  return comment.videoUUID;
}

const commentsController = {
  async createComment(req,res,next){
    const videoUUID = req.params.id;
    const userId = req.user._id;
    const {comment} = req.body;
    
    try{
      const myComment = new Comment({
        user:userId,
        videoUUID,
        comment,
        author:await findAUserNameById(userId),
      });
      const saveComment = await myComment.save();
      
      const updateCommentsArray = await FileData.findOneAndUpdate(
            {
              uuid: videoUUID,
            },
            {
              $push: {
                comments: saveComment._id,
              },
            },
            { new: true }
          );
     
      return res.status(200).json({message:"Comment published successfully"});
      
    }catch(err){
      const error = {
       error:"Uncaught error occurred in creating comment",
     };
   return res.status(400).json(error);
    }
    
  },
  
  // adding reply to a comment
  async addCommentReplies(req,res,next){
    const commentId = req.params.id;
    const userId = req.user._id; 
    const reply = req.body.reply;
    try{
      const comment = await Comment.findOne({_id:commentId});
      if(!comment){
        return res.status(400).json({"error":"Comment not found"});
      }
     const replyDate = new Date();
    const replyDetails = {
      user:userId,
      reply,
      author: await findAUserNameById(userId),
      date:replyDate.toGMTString()
    };
    const userReply = await Comment.findOneAndUpdate(
      {_id:commentId},
         {
           $push:{
             replies : replyDetails
           }
         },{new:true});
        const video_uuid = await findVideoUUID(commentId)
        return res.status(403).redirect(`/playvideo/${video_uuid}`)
      //return res.status(200).json({message:"reply added successfully"});
      
    }catch(err){
      const error = {
       error:"Uncaught error occurred in adding reply",
       msg:err.message
     };
   return res.status(400).json(error);
    }
  },
}

module.exports = commentsController
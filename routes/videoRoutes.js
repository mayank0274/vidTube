const videoActionController = require("../controllers/video/videoActionController")

const videoControls = require("../controllers/video/videoControls")

const commentsController = require("../controllers/video/commentsController");

// middleware
const user = require("../middleware/user")

const videoAction = (app)=>{
  
  // video controls -> fetch all video, video page, load data in chunks
  app.get("/",videoControls().getAllVideos);
  app.get("/playVideo/:id",videoControls().playVideoPage);
  app.get("/loadVideo/:id",videoControls().loadVideo);
  
  // video actions-> like,dislike, report, download
  app.patch("/like/:id",user,videoActionController().like);
  app.patch("/dislike/:id",user,videoActionController().dislike);
  app.patch("/reportVideo/:id",user,videoActionController().report);
  app.get("/download/:id",videoActionController().download);
  
  // comments
  app.post("/newcomment/:id",user,commentsController.createComment);
  app.post("/commentreply/:id",user,commentsController.addCommentReplies);
}

module.exports = videoAction;
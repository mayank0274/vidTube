const FileData = require("../../models/fileStr");
const Report = require("../../models/report");
const Like = require("../../models/like");
const Dislike = require("../../models/dislike");
const fs = require("fs");

const videoControls = ()=>{
  return{
    // get all videos
    async getAllVideos(req,res){
      try {
    const videos = await FileData.find();
    res.render("index", {
      videos: videos,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Uncaught error occurred while fetching videos" });
  }
    },
    //playVideo page 
    async playVideoPage(req,res){
      const id = req.params.id;
  try {
    const video = await FileData.findOne({ uuid: id });
    if (req.user) {
      const reportedVideo = await Report.findOne({
        user: req.user._id,
        video: id,
      });

      const likedVideo = await Like.findOne({
        user: req.user._id,
        video: id,
      });

      const dislikeVideo = await Dislike.findOne({
        user: req.user._id,
        video: id,
      });

      return res.render("playVideo", {
        video: video,
        isReported: reportedVideo,
        isLiked: likedVideo,
        isDislike: dislikeVideo,
        like_count: video.likes.length,
      });
    }
    return res.render("playVideo", {
      video: video,
      isReported: false,
      isLiked: false,
      isDislike: false,
      like_count: video.likes.length,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ "error": "Uncaught error occurred while playing video" });
  }
    },
    
    // load video chunks
    
    async loadVideo(req,res){
      const id = req.params.id;

  try {
    const video = await FileData.findOne({ uuid: id });
    //const videoPath = `../${video.videoPath}`;
    const videoPath = video.videoPath;
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6; //1mb
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (err) {
    return res
      .status(400)
      .json({ "error": "Uncaught error occurred while loading video" });
  }
    }, 
  };
}

module.exports = videoControls;
const Like = require("../../models/like");
const FileData = require("../../models/fileStr");
const Dislike = require("../../models/dislike");
const Report = require("../../models/report");
const fs = require("fs");
const path = require("path");

const videoActionController = () => {
  return {
    //like video
    async like(req, res) {
      const vdoId = req.params.id;
      const userId = req.user._id;

      try {
        const likedVdo = await Like.findOne({
          video: vdoId,
          user: userId,
        });

        if (!likedVdo) {
          const like = new Like({
            user: userId,
            video: vdoId,
          });

          const saveLike = await like.save();

          const updateLike = await FileData.findOneAndUpdate(
            {
              uuid: vdoId,
            },
            {
              $push: {
                likes: saveLike._id,
              },
            },
            { new: true }
          );

          return res.status(200).json({
            success: "Video liked successfully",
            iconClass: "fas fa-thumbs-up",
          });
        } else {
          const pullLike = await FileData.findOneAndUpdate(
            {
              uuid: vdoId,
            },
            {
              $pull: {
                likes: likedVdo._id,
              },
            },
            { new: true }
          );
          console.log(pullLike)
          const deleteLike = await Like.findOneAndDelete({
            _id: likedVdo._id,
          });
          return res.status(200).json({
            success: " like removed successfully",
            iconClass: "far fa-thumbs-up",
          });
        }
      } catch (err) {
        return res.status(400).json({
          error: "Uncaught error occurred while liking video",
        });
      }
    },

    // dislike video
    async dislike(req, res) {
      const vdoId = req.params.id;
      const userId = req.user._id;

      try {
        const DislikedVdo = await Dislike.findOne({
          user: userId,
          video: vdoId,
        });

        if (!DislikedVdo) {
          const dislike = new Dislike({
            user: userId,
            video: vdoId,
          });

          const saveDisLike = await dislike.save();

          const updateDislike = await FileData.findOneAndUpdate(
            {
              uuid: vdoId,
            },
            {
              $push: {
                dislikes: saveDisLike._id,
              },
            },
            { new: true }
          );

          return res.status(200).json({
            success: "Video disliked successfully",
            iconClass: "fas fa-thumbs-down",
          });
        } else {
          const pullDislike = await FileData.findOneAndUpdate(
            {
              uuid: vdoId,
            },
            {
              $pull: {
                dislikes: DislikedVdo._id,
              },
            },
            { new: true }
          );

          const deleteDislike = await Dislike.findOneAndDelete({
            _id: DislikedVdo._id,
          });

          return res.status(200).json({
            success: "Dislike removed",
            iconClass: "far fa-thumbs-down",
          });
        }
      } catch (err) {
        return res.status(400).json({
          error: "Uncaught error occurred while disliking video",
        });
      }
    },

    // report video

    async report(req, res) {
      const videoId = req.params.id;
      const userId = req.user._id;
      try {
        const reportedVideo = await Report.findOne({
          user: userId,
          video: videoId,
        });

        if (!reportedVideo) {
          const author = await FileData.findOne({
            uuid: videoId,
          });

          const report = new Report({
            user: userId,
            video: videoId,
            authorId: author.userId,
            authorName: author.author,
            reportBy: req.user.name,
          });

          const saveReport = await report.save();

          const updateVideoReport = await FileData.findOneAndUpdate(
            { uuid: videoId },
            {
              $push: { report: saveReport._id },
            },
            {
              new: true,
            }
          );

          return res
            .status(200)
            .json({
              success: "reported successfully",
              iconClass: "fas fa-flag",
            });
        }
        // return res.status(200).redirect(`/playVideo/${videoId}`)
        return res.status(400).json({ error: "Video already reported by you" });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Uncaught error in reporting video" });
      }
    },

    // download video
    async download(req, res) {
      const id = req.params.id;
      try {
        const video = await FileData.findOne({ uuid: id });

        const videoStream = fs.createReadStream(video.videoPath);
        
        const filePath = video.videoPath;
        const index = filePath.lastIndexOf("/");
        const fileName = filePath.slice(index+1,filePath.length);

        const ext = path.extname(fileName);

        res.attachment(`${video.videoName}${ext}`);
       videoStream.pipe(res)
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Uncaught error occurred while downloading",err });
      }
    },
  };
};

module.exports = videoActionController;

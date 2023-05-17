const FileData = require("../../models/fileStr");
const User = require("../../models/users");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const userController = () => {
  return {
    // user profile
    user: async function (req, res) {
      const id = req.user._id;

      const userVideos = await FileData.find({ userId: req.user._id });
      const count = await FileData.find({ userId: req.user._id }).count();

      res.render("user", {
        name: req.user.name,
        videos: userVideos,
        count: count,
      });
    },
    //upload video
    upload: async function (req, res) {
      if (!req.files || !req.body.title) {
        return res.status(400).json({ error: "All fields required" });
      }

      const poster = req.files["poster"][0].path;
      const video = req.files["video"][0].path;

      try {
        const fileContent = new FileData({
          userId: req.user._id,
          videoName: req.body.title,
          author: req.user.name,
          uuid: uuidv4(),
          videoPath: video,
          videoPathEJS: video.replace(video.slice(0, 7), "../"),
          posterPath: poster,
          posterPathEJS: poster.replace(poster.slice(0, 7), "../"),
        });

        const fileSave = await fileContent.save();
       console.log(fileSave);
        return res.status(200).json({ msg: "Video uploaded successfully" });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Uncaught error occurred in uploading video" });
      }
    },

    //delete video
    deleteVideo: async function (req, res) {
      const id = req.params.id;
      try {
        const reqVideo = await FileData.findOne({ uuid: id });
        fs.unlinkSync(reqVideo.videoPath);
        fs.unlinkSync(reqVideo.posterPath);

        const video = await FileData.findOneAndDelete({ uuid: id });
        return res.status(200).redirect("/user");
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Uncaught error while deleting video" });
      }
    },
  };
};

module.exports = userController;

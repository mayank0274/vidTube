const Report = require("../../models/report");
const FileData = require("../../models/fileStr");
const User = require("../../models/users");
const Like = require("../../models/like");
const Dislike = require("../../models/dislike");
const fs = require("fs");
const moment = require("moment");

const adminController = () => {
  return {
    // get reported video
    async reportedVideo(req, res) {
      try {
        const videos = await Report.find();

        return res.render("admin/report", {
          layout: "adminLayout",
          reports: videos,
          moment: moment,
        });
        // return res.status(200).json({"videos":videos,"users":userArr})
      } catch (err) {
        return res
          .status(400)
          .json({ error: "uncaught error in getting reported videos" });
      }
    },

    // handle reports -> discard report or delete video
    async handleReport(req, res) {
      const id = req.params.id;
      const action = req.query.action;
      try {
        const report = await Report.findOne({ _id: id });
        const reqVideo = await FileData.findOne({ uuid: report.video });
        if (action == "Delete") {
          fs.unlinkSync(reqVideo.videoPath);
          fs.unlinkSync(reqVideo.posterPath);
          await FileData.findOneAndDelete({ uuid: report.video });
          await Report.findOneAndDelete({
            _id: id,
          });
          return res.status(200).json({
            success: "Video queued for deleting",
          });
        } else {
          await FileData.findOneAndUpdate(
            {
              uuid: report.video,
            },
            {
              $pull: {
                reports: id,
              },
            },
            { new: true }
          );

          await Report.findOneAndDelete({
            _id: id,
          });

          return res.status(200).json({
            success: "Report queued for discarding",
          });
        }
      } catch (err) {
        return res
          .status(400)
          .json({ error: "uncaught error in handling report action" });
      }
    },

    // user details page
    async userDetails(req, res) {
      const userId = req.params.id;
      try {
        const user = await User.findOne({
          _id: userId,
        });
        return res.render("admin/userDetails", {
          layout: "adminLayout",
          user: user,
        });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "uncaught error in getting user details" });
      }
    },

    //terminate user account
    async terminateUser(req, res) {
      const userId = req.params.id;
      try {
        const user = await User.findOneAndDelete({
          _id: userId,
        });

        // delete user related all data
        await FileData.deleteMany({ userId });
        await Like.deleteMany({ user: userId });
        await Dislike.deleteMany({ user: userId });
        await Report.deleteMany({ user: userId });

        return res.status(200).json({ message: "User queued for removing" });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "uncaught error in removing user" });
      }
    },

    //get all users
    async getAllUsers(req, res) {
      try {
        const users = await User.find();
        return res.render("admin/allUser", {
          layout: "adminLayout",
          users: users,
        });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "uncaught error in fetching user" });
      }
    },
  };
};

module.exports = adminController;

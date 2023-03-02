const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${new Date().getTime().toString()}-${
      Math.random() * 1000
    }${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1000000 * 200, //200mb
  },
});

const uploadFields = upload.fields([
  { name: "poster", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

module.exports = uploadFields;
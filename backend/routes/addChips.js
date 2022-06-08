const express = require("express");
const multer = require("multer");

const Chips = require("../models/chips");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const chip = new Chips({
      name: req.body.name,
      email: req.body.email,
      imagePath: url + "/images/" + req.file.filename
    });
    chip.save().then(createdChip => {
      res.status(201).json({
        message: "Chip added successfully",
        chip: {
          ...createdChip,
          id: createdChip._id
        }
      });
    });
  }
)

module.exports = router;

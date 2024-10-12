// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { createUser, updateProfile } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/token");

const multer = require("multer");
const path = require("path");

//multer code
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif,jfif) are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

// Save user
router.post("/user", upload.array("profilePics", 5), createUser);

// Update profile
router.put("/user/:id", verifyToken, updateProfile);

module.exports = router;

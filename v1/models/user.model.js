const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
    unique: true,
    required: true,
  },
  referredBy: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  technology: {
    type: [String],
    required: true,
  },
  profilePics: {
    type: [String],
  },
  dob: {
    type: Date,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    required: false,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

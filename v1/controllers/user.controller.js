// controllers/userController.js
const User = require("../models/user.model");
const { handleReferral } = require("../middlewares/helpers/referralHelper");
const {
  generateReferralCode,
} = require("../middlewares/helpers/generateReferralCode");
const { encrypt } = require("../middlewares/helpers/encription");

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      mobile,
      password,
      referralCode,
      gender,
      technology,
      dob,
      role,
    } = req.body;
    let profilePics = [];

    console.log("referralCode", referralCode);

    // If profile pictures provided file upload logic
    if (req.files && req.files.length > 0) {
      profilePics = req.files.map((file) => file.path);
    }

    const newgeneratedReferralCode = generateReferralCode(name, mobile);

    // Handle referral
    const pointsForNewUser = await handleReferral(referralCode);

    const userRole = role || "user";

    // encrypt the password
    const encryptedPassword = encrypt(password);

    // Create the new user
    const newUser = new User({
      name,
      mobile,
      password: encryptedPassword,
      referralCode: newgeneratedReferralCode,
      referredBy: referralCode || null,
      gender,
      technology,
      profilePics,
      dob,
      points: pointsForNewUser,
      role: userRole,
    });

    // Save the new user in the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update self profile information
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    console.log("updatedData", updatedData);

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    console.log("updatedUser", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

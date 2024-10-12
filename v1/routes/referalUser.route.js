// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getReferralUsers,
  deleteReferralUser,
} = require("../controllers/referral.controller");
const { verifyToken } = require("../middlewares/token");

// Fetch referral user list

router.get("/referrals", verifyToken, getReferralUsers);

// Delete referral user

router.delete("/referrals/:userId", verifyToken, deleteReferralUser);

module.exports = router;

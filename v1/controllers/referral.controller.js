const User = require("../models/user.model");

// Fetch referral user list
exports.getReferralUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const referrals = await User.find({ referralCode: { $exists: true } })
      .skip(skip)
      .limit(limit);

    if (referrals.length !== 0) {
      res.status(200).json({
        count: referrals.length,
        message: "Referral Users List Fetch succesfully!",
        referrals,
      });
    } else {
      res.status(500).json({ message: "Referral Users List not available" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete referral user
exports.deleteReferralUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete({ _id: userId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

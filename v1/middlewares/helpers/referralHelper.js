const User = require("../../models/user.model");

const handleReferral = async (referralCode) => {
  console.log("func referralCode", referralCode);

  if (!referralCode) return 0;

  // Check if referralCode exists in the database
  const referrer = await User.findOne({ referralCode });
  console.log("referrer", referrer);
  if (!referrer) return 0;

  // Referral is valid, assign points to referrer
  referrer.points += 20;
  await referrer.save();

  return 10; // New user gets 10 points for being referred
};

module.exports = { handleReferral };

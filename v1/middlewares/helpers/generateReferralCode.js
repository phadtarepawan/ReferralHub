const generateReferralCode = (name, mobile) => {
  // Extract first 4 characters of the name
  const namePart = name.substring(0, 4).toUpperCase();

  // Extract the last 4 digits of the mobile number
  const mobilePart = mobile.slice(-4);

  // Combine name and mobile part to create the referral code
  const referralCode = `${namePart}${mobilePart}`;

  return referralCode;
};

module.exports = { generateReferralCode };

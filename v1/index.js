const express = require("express");
const router = express.Router();
const userRoute = require("./routes/user.route");
const referraluserRoute = require("./routes/referalUser.route");
const loginRoute = require("./routes/auth.route");

router.use("/users", userRoute);
router.use("/usersreferral", referraluserRoute);
router.use("/auth", loginRoute);

module.exports = router;

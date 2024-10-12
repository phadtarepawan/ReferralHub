const { compare } = require("../middlewares/helpers/encription");
const { createToken } = require("../middlewares/token");
const User = require("../models/user.model");

const AuthService = {
  async loginUser(mobile, password) {
    try {
      const data = await User.findOne({ mobile });
      console.log("login data", data);
      if (!data) {
        return { error: "Invalid Mobile or data is disabled", status: 404 };
      }

      if (compare(password, data.password)) {
        const accessToken = createToken(
          {
            id: data.mobile,
            password: data.password,
            type: "access",
          },
          60 * 60
        );

        const refreshToken = createToken(
          {
            id: data.mobile,
            password: data.password,
            type: "refresh",
          },
          30 * 60
        );

        return {
          data,
          accessToken,
          refreshToken,
        };
      } else {
        return { error: "Invalid Password", status: 401 };
      }
    } catch (error) {
      console.log(error);
      return { error: "Internal Server Error", status: 500 };
    }
  },

  //validate token
};

module.exports = AuthService;

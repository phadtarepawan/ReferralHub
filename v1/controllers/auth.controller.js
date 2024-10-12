const { verifyToken } = require("../middlewares/token");
const AuthService = require("../services/authService");

const AuthCtrl = {
  async userLogin(req, res) {
    const { mobile, password } = req.body;

    try {
      const data = await AuthService.loginUser(mobile, password);

      if (data.error) {
        return res.status(data.status).send({ message: data.error });
      }

      res.set("x-accesstoken", data.accessToken);
      res.set("x-refreshtoken", data.refreshToken);

      console.log("accessToken", data.accessToken);

      res.status(200).send({ message: "Login Successful", data: data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Could not login", error: error.message });
    }
  },
  async validateToken(req, res) {
    const { token } = req.body;

    const payload = verifyToken(token);
    if (payload) {
      // valid token
      res
        .status(200)
        .send({ message: "Token is valid", data: { id: payload?.id } });
    } else {
      // invalid Token
      res.status(400).send({ message: "Token is Invalid", error: null });
    }
  },
};

module.exports = AuthCtrl;

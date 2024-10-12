const jwt = require("jsonwebtoken");

const createToken = (payload, expiresIn = 60 * 60) => {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn });
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(403)
        .json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.KEY);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Token verification failed", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  createToken,
  verifyToken,
};

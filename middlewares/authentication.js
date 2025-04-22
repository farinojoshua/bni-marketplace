const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      throw { status: 401, message: "Unauthorize" };
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      throw { status: 400, message: "Unauthorized" };
    }

    req.user = { id: user.id, email: user.email, role: user.role };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;

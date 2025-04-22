function authorization(req, res, next) {
  if (!req.user || !req.user.role) {
    throw { status: 401, message: "Unauthorized" };
  }

  const role = req.user.role;

  if (role !== "admin") {
    throw { status: 403, message: "Forbidden: admin access only" };
  }

  next();
}

module.exports = authorization;

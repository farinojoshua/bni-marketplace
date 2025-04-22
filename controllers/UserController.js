const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, role, password, email } = req.body;

      if (!name || !role || !password || !email) {
        throw { status: 400, message: "semua field wajib diisi" };
      }

      const uniqueValue = await User.findOne({ where: { email: email } });
      if (uniqueValue) {
        throw { status: 400, message: "email already exists" };
      }

      const saltRound = Number(process.env.SALT_ROUND);
      const hashPassword = await bcrypt.hash(password, saltRound);

      const user = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      res.status(201).json({
        message: "Berhasil register",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { status: 400, message: "semua field harus diisi" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { status: 400, message: "email atau password salah" };
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw { status: 400, message: "email atau password salah" };
      }

      let userDecode = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(userDecode, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "Berhasil login",
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const allUser = await User.findAll({
        attributes: ["id", "name", "email", "role", "createdAt"],
      });

      res.status(200).json(allUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

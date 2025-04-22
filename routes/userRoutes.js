const route = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register akun user baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Berhasil register
 *       400:
 *         description: Data tidak lengkap atau email sudah ada
 */
route.post("/register", UserController.register);

route.post("/login", UserController.login);
route.get("/users", authentication, authorization, UserController.getAllUser);

module.exports = route;

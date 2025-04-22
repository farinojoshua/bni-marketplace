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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jakarta@mail.com
 *               password:
 *                 type: string
 *                 example: jakarta123
 *     responses:
 *       200:
 *         description: Berhasil login dan mendapatkan token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Email atau password salah / field kosong
 */
route.post("/login", UserController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ambil semua user (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil ambil data user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized (tidak ada token)
 *       403:
 *         description: Forbidden (bukan admin)
 */
route.get("/users", authentication, authorization, UserController.getAllUser);

module.exports = route;

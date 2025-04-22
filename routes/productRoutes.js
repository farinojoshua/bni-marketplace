const route = require("express").Router();
const ProductController = require("../controllers/ProductController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Tambah produk baru (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro Max
 *               price:
 *                 type: number
 *                 example: 20000000
 *     responses:
 *       201:
 *         description: Berhasil tambah produk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Field tidak lengkap
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (bukan admin)
 */
route.post("/", authentication, authorization, ProductController.addProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Ambil semua produk
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Berhasil ambil produk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
route.get("/", ProductController.getAllProduct);

module.exports = route;

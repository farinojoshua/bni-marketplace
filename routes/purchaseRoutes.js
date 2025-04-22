const route = require("express").Router();
const PurchaseController = require("../controllers/PurchaseController");
const authentication = require("../middlewares/authentication");

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Melakukan pembelian produk (user harus login)
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Berhasil melakukan purchase
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: berhasil purchase
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     productId:
 *                       type: integer
 *       400:
 *         description: Field tidak lengkap atau invalid
 *       401:
 *         description: Unauthorized (belum login)
 *       500:
 *         description: Server error
 */
route.post("/", authentication, PurchaseController.purchaseProduct);

module.exports = route;

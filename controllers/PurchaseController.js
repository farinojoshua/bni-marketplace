const { Purchase } = require("../models");

class PurchaseController {
  static async purchaseProduct(req, res, next) {
    try {
      const { productId } = req.body;

      const tampData = {
        productId: productId,
        userId: req.user.id,
      };

      const result = await Purchase.create(tampData);
      return res
        .status(200)
        .json({ message: "berhasil purchase", data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PurchaseController;

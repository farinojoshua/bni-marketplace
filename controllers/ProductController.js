const { Product } = require("../models");

class ProductController {
  static async addProduct(req, res, next) {
    try {
      const { name, price } = req.body;

      if (!name || !price) {
        return res.status(400).json({ message: "semua field harus diisi" });
      }

      const product = await Product.create({ name, price });
      return res
        .status(201)
        .json({ message: "berhasil tambah produk", data: product });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProduct(req, res, next) {
    try {
      const allProduct = await Product.findAll();

      return res
        .status(200)
        .json({ message: "Berhasil ambil data produk", data: allProduct });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;

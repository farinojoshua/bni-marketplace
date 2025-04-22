const ProductController = require("../controllers/ProductController");
const { Product } = require("../models");

jest.mock("../models", () => ({
  Product: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("ProductController - Unit Tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "iPhone",
        price: 15000000,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    Product.create.mockReset();
    Product.findAll.mockReset();
  });

  describe("addProduct", () => {
    test("Berhasil menambahkan produk", async () => {
      Product.create.mockResolvedValue({
        id: 1,
        name: "iPhone",
        price: 15000000,
      });

      await ProductController.addProduct(req, res, next);

      expect(Product.create).toHaveBeenCalledWith({
        name: "iPhone",
        price: 15000000,
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "berhasil tambah produk",
        data: expect.objectContaining({
          name: "iPhone",
          price: 15000000,
        }),
      });
    });

    test("Gagal karena field kosong", async () => {
      req.body = { name: "", price: "" };

      await ProductController.addProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "semua field harus diisi",
      });
    });
  });

  describe("getAllProduct", () => {
    test("Berhasil ambil semua produk", async () => {
      const mockProducts = [
        { id: 1, name: "iPhone", price: 15000000 },
        { id: 2, name: "Samsung", price: 13000000 },
      ];

      Product.findAll.mockResolvedValue(mockProducts);

      await ProductController.getAllProduct(req, res, next);

      expect(Product.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Berhasil ambil data produk",
        data: mockProducts,
      });
    });
  });
});

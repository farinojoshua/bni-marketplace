const PurchaseController = require("../controllers/PurchaseController");
const { Purchase } = require("../models");

jest.mock("../models", () => ({
  Purchase: {
    create: jest.fn(),
  },
}));

describe("PurchaseController - Unit Test", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        productId: 1,
      },
      user: {
        id: 99,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    Purchase.create.mockReset();
  });

  describe("purchaseProduct", () => {
    test("Berhasil melakukan purchase", async () => {
      const mockResult = {
        id: 10,
        productId: 1,
        userId: 99,
      };

      Purchase.create.mockResolvedValue(mockResult);

      await PurchaseController.purchaseProduct(req, res, next);

      expect(Purchase.create).toHaveBeenCalledWith({
        productId: 1,
        userId: 99,
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "berhasil purchase",
        data: mockResult,
      });
    });
  });
});

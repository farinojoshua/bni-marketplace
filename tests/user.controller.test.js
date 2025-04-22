const UserController = require("../controllers/UserController");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("UserController - Unit Tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "Jakarta",
        email: "jakarta@mail.com",
        password: "jakarta123",
        role: "admin",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    User.findOne.mockReset();
    User.create.mockReset();
    User.findAll.mockReset();
    bcrypt.hash.mockReset();
    bcrypt.compare.mockReset();
    jwt.sign.mockReset();
  });

  describe("register", () => {
    test("Berhasil register user baru", async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashed_password");
      User.create.mockResolvedValue({
        id: 1,
        name: "Jakarta",
        email: "jakarta@mail.com",
        role: "admin",
      });

      await UserController.register(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "jakarta@mail.com" },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(
        "jakarta123",
        expect.any(Number)
      );
      expect(User.create).toHaveBeenCalledWith({
        name: "Jakarta",
        email: "jakarta@mail.com",
        password: "hashed_password",
        role: "admin",
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Berhasil register" })
      );
    });

    test("Gagal register karena field kosong", async () => {
      req.body = {
        name: "",
        email: "",
        password: "",
        role: "",
      };

      await UserController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 400,
          message: "semua field wajib diisi",
        })
      );
    });
  });

  describe("login", () => {
    test("Berhasil login dengan data valid", async () => {
      User.findOne.mockResolvedValue({
        id: 1,
        name: "Jakarta",
        email: "jakarta@mail.com",
        password: "hashed_password",
        role: "admin",
      });

      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mocked_token");

      await UserController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Berhasil login",
        data: { token: "mocked_token" },
      });
    });

    test("Gagal login karena field kosong", async () => {
      req.body = { email: "", password: "" };

      await UserController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 400,
          message: "semua field harus diisi",
        })
      );
    });

    test("Gagal login karena user tidak ditemukan", async () => {
      User.findOne.mockResolvedValue(null);

      await UserController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 400,
          message: "email atau password salah",
        })
      );
    });

    test("Gagal login karena password salah", async () => {
      User.findOne.mockResolvedValue({ password: "hashed_password" });
      bcrypt.compare.mockResolvedValue(false);

      await UserController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 400,
          message: "email atau password salah",
        })
      );
    });
  });

  describe("getAllUser", () => {
    test("Berhasil mengambil semua user", async () => {
      const mockUsers = [
        {
          id: 1,
          name: "Jakarta",
          email: "jakarta@mail.com",
          role: "admin",
          createdAt: new Date(),
        },
        {
          id: 2,
          name: "Bandung",
          email: "bandung@mail.com",
          role: "customer",
          createdAt: new Date(),
        },
      ];

      User.findAll.mockResolvedValue(mockUsers);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await UserController.getAllUser(req, res, next);

      expect(User.findAll).toHaveBeenCalledWith({
        attributes: ["id", "name", "email", "role", "createdAt"],
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });
});

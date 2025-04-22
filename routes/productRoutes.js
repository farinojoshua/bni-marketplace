const route = require("express").Router();
const ProductController = require("../controllers/ProductController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

route.post("/", authentication, authorization, ProductController.addProduct);
route.get("/", ProductController.getAllProduct);

module.exports = route;

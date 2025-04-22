const route = require("express").Router();
const PurchaseController = require("../controllers/PurchaseController");
const authentication = require("../middlewares/authentication");

route.post("/", authentication, PurchaseController.purchaseProduct);

module.exports = route;

const route = require("express").Router();
const userRoutes = require("./userRoutes");
const purchaseRoutes = require("./purchaseRoutes");
const productRoutes = require("./productRoutes");

route.get("/", (req, res) => {
  res.send("masuk sini");
});

route.use("/", userRoutes);
route.use("/products", productRoutes);
route.use("/purchase", purchaseRoutes);

module.exports = route;

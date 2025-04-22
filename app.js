const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

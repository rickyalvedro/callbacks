const express = require("express");

const bodyParser = require("body-parser");

const sequelize = require("./util/database");

var cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const sequelize = require("./util/database");

var cors = require("cors");
const Expense = require("./models/Expense");

const expenseRoutes = require("./routes/expense");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/expense", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

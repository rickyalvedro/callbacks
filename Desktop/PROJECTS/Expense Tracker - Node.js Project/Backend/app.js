const express = require("express");

const bodyParser = require("body-parser");

const sequelize = require("./util/database");

var cors = require("cors");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

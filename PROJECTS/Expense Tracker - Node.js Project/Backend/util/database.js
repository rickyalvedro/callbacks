const Sequelize = require("sequelize");
const sequelize = new Sequelize("expense", "root", "Pintu#786", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

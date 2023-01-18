const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Pintu#786", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

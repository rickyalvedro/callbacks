const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  description: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
});

module.exports = Expense;

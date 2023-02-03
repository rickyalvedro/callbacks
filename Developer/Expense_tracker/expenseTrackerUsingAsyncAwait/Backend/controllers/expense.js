const Expense = require("../models/Expense");

const addExpense = async (req, res, next) => {
  try {
    if (req.body.amount == "undefined") {
      throw new Error("Amount is mandatory");
    }
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    const data = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    res.status(200).json({ newExpenseDetail: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ allExpenses: expenses });
  } catch (err) {
    console.log("Get Expense is failing", JSON.stringify(err));
    res.status(500).json({ error: err });
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    if (req.params.id == "undefined") {
      console.log("ID is missing");
      return res.status(404).json({ error: "ID is missing" });
    }
    const eId = req.params.id;
    await Expense.destroy({ where: { id: eId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
};

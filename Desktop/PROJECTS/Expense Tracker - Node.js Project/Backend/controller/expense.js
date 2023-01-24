const Expense = require("../models/expenses");

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const addexpense = async (req, res) => {
  try {
    const { expenseamount, description, category } = req.body;
    if (
      expenseamount == undefined ||
      expenseamount.length === 0 ||
      isstringinvalid(description) ||
      isstringinvalid(category)
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Bad Parameters . Something is missing.",
        });
    }
    const expense = Expense.create({ expenseamount, description, category });
    return res.status(201).json({ expense, success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

const getexpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    return res.status(200).json({ expenses, success: true });
  } catch (err) {
    return res.status(500).json({ error: err, success: false });
  }
};

const deleteexpense = async (req, res) => {
  try {
    const expenseid = req.params.expenseid;
    if (expenseid == undefined || expenseid.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Bad Parameters .",
        });
    }
    Expense.destroy( { where: { id: expenseid }});
    return res.status(200).json({success: true, message:"Deleted successfully"});
  } catch(err) {
    console.log(err);
    return res.status(500).json({success: false, message:"Failed to delete"});
  }
};

module.exports = {
  addexpense,
  getexpenses,
  deleteexpense
};

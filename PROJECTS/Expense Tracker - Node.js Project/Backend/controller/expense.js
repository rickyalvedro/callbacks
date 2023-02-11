const Expense = require("../models/expenses");
const AWS = require("aws-sdk");
const UserServices = require("../services/userservices");
const S3Service = require("../services/S3services");

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const downloadexpense = async (req, res) => {
  try {
    const expenses = await UserServices.getExpenses(req); // here expenses are array
    // console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses); // converting array to string , because you cannot write an array to a file but a string to a file
    // filename should depend upon userid
    const userId = req.user.id;

    const filename = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await S3Service.uploadToS3(stringifiedExpenses, filename);
    res.status(201).json({ fileURL, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ fileURL: "", success: false, error: err });
  }
};

const addexpense = async (req, res) => {
  try {
    const { expenseamount, description, category } = req.body;
    if (
      expenseamount == undefined ||
      expenseamount.length === 0 ||
      isstringinvalid(description) ||
      isstringinvalid(category)
    ) {
      return res.status(400).json({
        success: false,
        message: "Bad Parameters . Something is missing.",
      });
    }
    const expense = await Expense.create({
      expenseamount,
      description,
      category,
      userId: req.user.id,
    });
    return res.status(201).json({ expense, success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

const getexpenses = async (req, res) => {
  try {
    // const expenses = await Expense.findAll({ where: { userId: req.user.id } }); // const expenses = await req.user.getExpenses();
    // return res.status(200).json({ expenses, success: true });
    const uId = req.user.id;
    const limit = req.query.limit ? parseInt(req.query.limit) : 2;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    console.log(page);
    console.log("SIRAJUDDIN", req.user.id);
    Expense.findAndCountAll({ where: { userId: uId } })
      .then((data) => {
        var pages = Math.ceil(data.count / limit);

        req.user
          .getExpenses({ offset: (page - 1) * limit, limit: limit })
          .then((expense) => {
            console.log(expense, "expense created");
            res.json({ expense, pages: pages });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

const deleteexpense = async (req, res) => {
  try {
    const expenseid = req.params.expenseid;
    // console.log(expenseid);
    if (expenseid == undefined || expenseid.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Bad Parameters .",
      });
    }
    const noofrows = await Expense.destroy({
      where: { id: expenseid, userId: req.user.id },
    });
    console.log(noofrows);
    // console.log(id);
    // console.log(userId);
    if (noofrows === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense doesnot belong to the user",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete" });
  }
};

module.exports = {
  addexpense,
  getexpenses,
  deleteexpense,
  downloadexpense,
};

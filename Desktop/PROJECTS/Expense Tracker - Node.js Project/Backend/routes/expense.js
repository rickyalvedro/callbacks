const express = require('express');
const expenseController = require('../controller/expense');

const router = express.Router();
router.post('/addexpense', expenseController.addexpense);
router.post('/getexpenses', expenseController.getexpenses);
router.post('/deleteexpense/:expenseid', expenseController.deleteexpense);

module.exports = router;


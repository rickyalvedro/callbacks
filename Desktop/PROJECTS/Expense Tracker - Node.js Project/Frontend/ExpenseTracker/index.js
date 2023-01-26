async function addNewExpense(e) {
  try {
    e.preventDefault();
    const expenseDetails = {
      expenseamount: e.target.expenseamount.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };
    console.log(expenseDetails);
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/expense/addexpense",
      expenseDetails,
      { headers: { Authorization: token } }
    );
    addNewExpensetoUI(response.data.expense);
  } catch (err) {
    showError(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/expense/getexpenses",
      { headers: { Authorization: token } }
    );
    response.data.expenses.forEach((expense) => {
      addNewExpensetoUI(expense);
    });
  } catch (err) {
    showError(err);
  }
});

function addNewExpensetoUI(expense) {
  const parentElement = document.getElementById("listOfExpenses");
  const expenseElemId = `expense - ${expense.id}`;
  parentElement.innerHTML += `<li id=${expenseElemId}>${expense.amount} - ${expense.category} - ${expense.description}
                              <button onclick="deleteExpense(event,'${expense.id}')"> Delete Expense </button>
                              </li>`;
}

async function deleteExpense(e, expenseid) {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(
      `http://localhost:3000/expense/deleteexpense/${expenseid}`,
      { headers: { Authorization: token } }
    );
    removeExpensefromUI(expenseid);
  } catch (err) {
    showError(err);
  }
}

function showError(err) {
  console.log(JSON.stringify(err));
  document.body.innerHTML += `<div style='color:red;'>${err.message} </div>`;
}

function removeExpensefromUI(expenseid) {
  const expenseElemId = `expense - ${expenseid}`;
  document.getElementById(expenseElemId).remove();
}

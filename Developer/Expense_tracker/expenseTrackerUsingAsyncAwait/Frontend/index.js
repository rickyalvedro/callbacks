async function createExpenses(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;
  // localStorage.setItem("amount", amount);
  // localStorage.setItem("description", description);
  // localStorage.setItem("category", category);

  const obj = {
    amount,
    description,
    category,
  };

  try {
    const response = await axios.post(
      "http://localhost:4000/expense/add-expense",
      obj
    );
    console.log(response.data);
    showNewExpenseOnScreen(response.data.newExpenseDetail);
  } catch (error) {
    document.body.innerHTML += "<h4> Something went wrong </h4>";
    console.log(error);
  }

  // localStorage.setItem(obj.category, JSON.stringify(obj));
  // showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/expense/get-expenses"
    );
    console.log(response);

    for (var i = 0; i < response.data.allExpenses.length; i++) {
      showNewExpenseOnScreen(response.data.allExpenses[i]);
    }
  } catch (error) {
    console.log(error);
  }
  // const localStorageObj = localStorage;
  // const localstoragekeys = Object.keys(localStorageObj);
  // for (var i = 0; i < localstoragekeys.length; i++) {
  //   const key = localstoragekeys[i];
  //   const userDetailsString = localStorageObj[key];
  //   const userDetailsObj = JSON.parse(userDetailsString);
  //   showNewUserOnScreen(userDetailsObj);
  // }
});

function showNewExpenseOnScreen(expense) {
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  if (localStorage.getItem(expense.id) !== null) {
    removeExpenseFromScreen(expense.id);
  }

  const parentNode = document.getElementById("listOfExpenses");
  const childHTML = `<li id=${expense.id}> ${expense.amount} - ${expense.description} - ${expense.category}
                     <button onclick="deleteExpense('${expense.id}')"> Delete Espense </button>
                     <button onclick="editExpenseDetails('${expense.category}','${expense.amount}','${expense.description}','${expense.id}')"> Edit Expense </button>
                     </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function removeExpenseFromScreen(expenseId) {
  const parentNode = document.getElementById("listOfExpenses");
  const childNodeToBeDeleted = document.getElementById(expenseId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

async function deleteExpense(expenseId) {
  try {
    const response = await axios.delete(
      `http://localhost:4000/expense/delete-expense/${expenseId}`
    );
    console.log(response);
    removeExpenseFromScreen(expenseId);
  } catch (error) {
    console.log(error);
  }
  //console.log(category);
  // localStorage.removeItem(category);
  // removeUserFromScreen(category);
}

function editExpenseDetails(category, amount, description, expenseId) {
  // console.log(category);
  document.getElementById("category").value = category;
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  deleteExpense(expenseId);
}

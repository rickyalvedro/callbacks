// const token = localStorage.getItem("token");
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

function showLeaderBoard() {
  const inputElement = document.createElement("input");
  inputElement.type = "button";
  inputElement.value = "Show Leaderboard";
  inputElement.onclick = async () => {
    const token = localStorage.getItem("token");
    const userLeaderBoardArray = await axios.get(
      "http://localhost:3000/premium/showLeaderBoard",
      { headers: { Authorization: token } }
    );
    console.log(userLeaderBoardArray);

    var leaderBoardElem = document.getElementById("leaderboard");
    leaderBoardElem.innerHTML = "<h1> Leader Board </h1>";
    userLeaderBoardArray.data.forEach((userDetails) => {
      leaderBoardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.total_cost}  </li>`;
    });
  };
  document.getElementById("message").appendChild(inputElement);
}

function showPremiumuserMessage() {
  document.getElementById("rzp-button1").style.visibility = "hidden";
  document.getElementById("message").innerHTML = "You are a Premium user";
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", getDOMpage);
async function getDOMpage() {
  try {
    const parentnode = document.querySelector("#listOfExpenses");
    //const select=localStorage.getItem('select');
    parentnode.innerHTML = "";
    const token = localStorage.getItem("token");
    // const select = localStorage.getItem("select");
    const LIMIT = 2;
    const PAGE = 1;

    const decodeToken = parseJwt(token);
    console.log(decodeToken);
    const ispremiumuser = decodeToken.ispremiumuser;
    if (ispremiumuser) {
      showPremiumuserMessage();
      showLeaderBoard();
    }
    const response = await axios.get(
      `http://localhost:3000/expense/getexpenses?limit=${LIMIT}&page=${PAGE}`,
      { headers: { Authorization: token } }
    );
    createpagination(response.data.pages);
    response.data.expense.forEach((expense) => {
      addNewExpensetoUI(expense);
    });
  } catch (err) {
    showError(err);
  }
}

async function getexpenses() {
  try {
    const parentnode = document.querySelector("#listOfExpenses");
    //const select=localStorage.getItem('select');
    parentnode.innerHTML = "";
    const token = localStorage.getItem("token");
    // const select = localStorage.getItem("select");
    const LIMIT = localStorage.getItem("select");
    const PAGE = 1;

    const decodeToken = parseJwt(token);
    console.log(decodeToken);
    // const ispremiumuser = decodeToken.ispremiumuser;
    // if (ispremiumuser) {
    //   showPremiumuserMessage();
    //   showLeaderBoard();
    // }
    const response = await axios.get(
      `http://localhost:3000/expense/getexpenses?limit=${LIMIT}&page=${PAGE}`,
      { headers: { Authorization: token } }
    );
    createpagination(response.data.pages);
    response.data.expense.forEach((expense) => {
      addNewExpensetoUI(expense);
    });
  } catch (err) {
    showError(err);
  }
}

function createpagination(pages) {
  document.querySelector("#pagination").innerHTML = "";
  let childhtml = "";
  for (var i = 1; i <= pages; i++) {
    childhtml += `<a class="mx-2" id="page=${i}" class="active">${i}</a>`;
  }
  const parentnode = document.querySelector("#pagination");
  parentnode.innerHTML = parentnode.innerHTML + childhtml;
}

document.querySelector("#pagination").addEventListener("click", getexpensepage);
async function getexpensepage(e) {
  // alert(e.target.id);
  console.log(e.target.innerHTML);
  const parentnode = document.querySelector("#listOfExpenses");
  //    const select=localStorage.getItem('select');
  parentnode.innerHTML = "";
  // const limit=`${select}?'&limit='${select}`;
  const LIMIT = localStorage.getItem("select");
  const token = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `http://localhost:3000/expense/getexpenses?limit=${LIMIT}&page=${e.target.innerHTML}`,
      { headers: { Authorization: token } }
    );
    for (let i = 0; i < response.data.expense.length; i++) {
      addNewExpensetoUI(response.data.expense[i]);
    }
  } catch (err) {
    console.log(err);
  }
}

document.querySelector("#select").addEventListener("change", (e) => {
  localStorage.setItem("select", e.target.value);
  getexpenses();
  // getexpensepage();
});

function addNewExpensetoUI(expense) {
  const parentElement = document.getElementById("listOfExpenses");
  const expenseElemId = `expense - ${expense.id}`;
  parentElement.innerHTML += `<li id="${expenseElemId}">${expense.expenseamount} - ${expense.category} - ${expense.description}
                              <button onclick="deleteExpense(event,'${expense.id}')"> Delete Expense </button>
                              </li>`;
}

async function deleteExpense(e, expenseid) {
  try {
    console.log(e.target.parentNode.id);
    const token = localStorage.getItem("token");
    console.log(`Deleting ${expenseid}`);
    await axios.delete(
      `http://localhost:3000/expense/deleteexpense/${expenseid}`,
      { headers: { Authorization: token } }
    );
    console.log("Deleted successfully");
    removeExpensefromUI(e.target.parentNode.id);
  } catch (err) {
    showError(err);
  }
}

function showError(err) {
  console.log(JSON.stringify(err));
  document.body.innerHTML += `<div style='color:red;'>${err.message} </div>`;
}

function removeExpensefromUI(expenseid) {
  // const expenseElemId = `expense - ${expenseid}`;
  // console.log(expenseElemId);
  document.getElementById(expenseid).remove();
}

async function download() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/expense/download", {
      headers: { Authorization: token },
    });
    console.log("sending all expenses");
    if (response.status === 201) {
      // the backend is essentially sending a download link
      // which if we open in browser, the file would download
      var a = document.createElement("a");
      a.href = response.data.fileURL;
      a.download = "myexpense.csv";
      a.click();
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    showError(err);
  }
}

document.getElementById("rzp-button1").onclick = async function (e) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",
    { headers: { Authorization: token } }
  );
  console.log(response);
  var options = {
    key: response.data.key_id,
    name: "YAV Technology",
    order_id: response.data.order.id, // For one time payment
    prefill: {
      name: "Yash Prasad",
      email: "prasadyash2411@gmail.com",
      contact: "7003442036",
    },
    theme: {
      color: "#3399cc",
    },
    handler: async function (response) {
      await axios.post(
        "http://localhost:3000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );

      alert("You are a premium user now");
      document.getElementById("rzp-button1").style.visibility = "hidden";
      document.getElementById("message").innerHTML = "You are a Premium user";
      localStorage.setItem("token", res.data.token);
      showLeaderBoard();
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", function (response) {
    console.log(response);
    alert("Something went wrong");
  });
};

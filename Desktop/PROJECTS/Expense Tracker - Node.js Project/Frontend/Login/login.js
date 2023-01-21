async function login(e) {
  try {
    e.preventDefault();
    console.log(e.target.name);
    const loginDetails = {
      email: e.target.value,
      password: e.target.value,
    };
    console.log(loginDetails);
    const response = await axios.post(
      "http://localhost:3000/user/login",
      loginDetails
    );
    alert(response.data.message);
  } catch (err) {
    console.log(JSON.stringify(err));
    document.body.innerHTML += `<div style='color:red;'>${err.message} </div>`;
  }
}

var signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("CREATE BTN CLICKED");
  const username = document.querySelector("#newUsername").value.trim();
  const password = document.querySelector("#Crpswd").value.trim();
  // const passwordTwo = document.querySelector('#repswd').value.trim();
  console.log(username, password);
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert("Failed to sign up!");
    }
  }
};

var loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#pswd").value.trim();
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert("Failed to log in!");
    }
  }
};

document.getElementById("loginBtn").addEventListener("click", loginFormHandler);

document
  .getElementById("signupBtn")
  .addEventListener("click", signupFormHandler);

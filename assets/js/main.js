document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  const avatarLink = document.getElementById("avatar-link");
  const usernameDisplay = document.getElementById("username");

  if (token) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "block";
    avatarLink.style.display = "block";
    usernameDisplay.textContent = username || "User";
  } else {
    loginLink.style.display = "block";
    registerLink.style.display = "block";
    logoutLink.style.display = "none";
    avatarLink.style.display = "none";
  }

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/login.html";
  });
});

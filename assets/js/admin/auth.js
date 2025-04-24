document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Sai tài khoản hoặc mật khẩu!");
        return;
      }

      const res = await response.json();

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("username", res.data.user.name);

      if (res.data.user.role === "admin") {
        window.location.href = "admin/index.html";
      } else {
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  });
});

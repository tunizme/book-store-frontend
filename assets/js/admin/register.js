document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password_confirmation = document
      .getElementById("password_confirmation")
      .value.trim();

    try {
      const response = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          "Đăng ký thất bại: " + (errorData.message || "Lỗi không xác định")
        );
        return;
      }

      const data = await response.json();
      alert("Đăng ký thành công! Chuyển hướng đến đăng nhập...");
      window.location.href = "/login.html";
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Không thể kết nối đến server.");
    }
  });
});

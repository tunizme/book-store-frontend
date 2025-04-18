const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  alert("Bạn không có quyền truy cập trang quản trị.");
  window.location.href = "/login.html";
}

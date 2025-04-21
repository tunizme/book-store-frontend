document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("desc").value.trim();
    const price = parseInt(document.getElementById("price").value);
    const stock = document.getElementById("stock").value.trim();
    const imageInput = document.getElementById("product-image");
    const imageFile = imageInput.files[0];

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          "Thêm sản phẩm thất bại: " + (data.message || "Lỗi không xác định")
        );
        return;
      }

      alert("Thêm sản phẩm thành công!");
      form.reset();

      window.location.href = "/admin/";
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến server.");
    }
  });
});

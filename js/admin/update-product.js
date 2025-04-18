document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("updateProductForm");
  const nameInput = document.getElementById("name");
  const descInput = document.getElementById("desc");
  const priceInput = document.getElementById("price");
  const stockInput = document.getElementById("stock");
  const imageInput = document.getElementById("product-image");
  const imagePreview = document.getElementById("image-preview");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  let currentImage = "";

  if (!productId) {
    alert("Thiếu ID sản phẩm.");
    return;
  }

  async function loadProduct() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/products/${productId}`
      );
      const product = await res.json();

      nameInput.value = product.name || "";
      descInput.value = product.description || "";
      priceInput.value = product.price || "";
      stockInput.value = product.stock || "";
      if (product.image_url) {
        currentImage = product.image_url;
        imagePreview.src = product.image_url;
        imagePreview.style.display = "block";
      }
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
      alert("Không thể tải sản phẩm.");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", nameInput.value.trim());
    formData.append("description", descInput.value.trim());
    formData.append("price", parseFloat(priceInput.value));
    formData.append("stock", parseInt(stockInput.value) || 0);

    const imageFile = imageInput.files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", currentImage);
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/products/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Cập nhật thất bại: " + (data.message || "Lỗi không xác định"));
        return;
      }

      alert("Cập nhật thành công!");
      window.location.href = "/admin/index.html";
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Lỗi kết nối server.");
    }
  });

  loadProduct();
});

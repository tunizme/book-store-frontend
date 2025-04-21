document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    alert("Không tìm thấy sản phẩm.");
    window.location.href = "/index.html";
    return;
  }

  // Hàm lấy chi tiết sản phẩm
  fetch(`http://localhost:3000/api/v1/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Không tìm thấy sản phẩm.");
      }
      return response.json();
    })
    .then((product) => {
      displayProductDetail(product);
    })
    .catch((error) => {
      console.error(error);
      alert("Lỗi khi tải chi tiết sản phẩm.");
      window.location.href = "/index.html";
    });
});

function displayProductDetail(product) {
  const container = document.getElementById("product-detail");

  container.innerHTML = `
      <div class="product-detail-card">
  <img src="${product.image_url ?? "/assets/images/default.jpg"}" alt="${
    product.name
  }" class="product-img"/>

  <div class="product-info">
    <h2>${product.name ?? "Không có tên"}</h2>
    <p class="desc">${product.description ?? "Chưa có mô tả"}</p>
    <p class="price">
      ${
        product.price
          ? parseFloat(product.price).toLocaleString() + "đ"
          : "Chưa có giá"
      }
    </p>
    <button class="add-to-cart-btn">Thêm vào giỏ</button>
  </div>
</div>
    `;
}

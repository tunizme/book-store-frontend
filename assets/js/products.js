document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  fetch("http://localhost:3000/api/v1/products")
    .then((res) => res.json())
    .then((data) => {
      const products = data.products;

      if (!products.length) {
        productList.innerHTML = "<p>Không có sản phẩm nào.</p>";
        return;
      }

      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src=${
              product.image_url ?? "/assets/images/default.jpg"
            } alt="${product.name}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${product.name ?? "Không có tên"}</h5>
              <p>${
                product.price
                  ? parseFloat(product.price).toLocaleString() + "đ"
                  : "Chưa có giá"
              }</p>
              <button class="add-to-cart">Thêm vào giỏ</button>
              <button class="view-details" onclick="window.location.href='/product-detail.html?id=${
                product.id
              }'">Xem chi tiết</button>
            </div>
          `;

        productList.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Lỗi khi tải sản phẩm:", err);
      productList.innerHTML = "<p>Lỗi khi tải dữ liệu.</p>";
    });
});

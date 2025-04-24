document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const pagination = document.getElementById("pagination");
  const productsPerPage = 8;
  let currentPage = 1;
  let totalPages = 1;

  // Fetch products from the API for the current page
  async function fetchProducts(page = 1) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/products?page=${page}&per_page=${productsPerPage}`
      );
      const data = await res.json();

      const products = data.data.products;
      const meta = data.data.meta; // Extract meta information
      currentPage = meta.current_page; // Update current page
      totalPages = meta.total_pages; // Update total pages

      if (!products.length) {
        productList.innerHTML = "<p>Không có sản phẩm nào.</p>";
        return;
      }

      renderProducts(products);
      renderPagination();
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      productList.innerHTML = "<p>Lỗi khi tải dữ liệu.</p>";
    }
  }

  // Render products for the current page
  function renderProducts(products) {
    productList.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src=${product.image_url ?? "/assets/images/default.jpg"} alt="${
        product.name
      }" class="card-img-top" />
        <div class="card-body">
          <div class="card-body-content">
            <h5 class="card-title">${product.name}</h5>
            <p>${
              product.price
                ? Math.round(product.price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "Chưa có giá"
            }<sup>₫</sup></p>
          </div>
          <div> 
            <button class="btn-details" onclick="window.location.href='/product-detail.html?id=${
              product.id
            }'">Xem chi tiết</button>
          </div>
        </div>
      `;

      productList.appendChild(card);
    });
  }

  // Render pagination controls
  function renderPagination() {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = "page-btn";
      if (i === currentPage) pageButton.classList.add("active");

      pageButton.addEventListener("click", () => {
        currentPage = i;
        fetchProducts(currentPage); // Fetch products for the selected page
      });

      pagination.appendChild(pageButton);
    }
  }

  // Initial fetch
  fetchProducts(currentPage);
});

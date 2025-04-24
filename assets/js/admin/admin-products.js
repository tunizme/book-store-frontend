document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("productTableBody");
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  document.querySelector(".container").appendChild(pagination);

  const productsPerPage = 10;
  let currentPage = 1;
  let totalPages = 1;

  async function fetchProducts(page = 1) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/products?page=${page}&per_page=${productsPerPage}`
      );
      const res = await response.json();
      const products = res.data.products || [];
      const meta = res.data.meta;

      currentPage = meta.current_page;
      totalPages = meta.total_pages;

      tableBody.innerHTML = "";

      if (products.length === 0) {
        tableBody.innerHTML =
          "<tr><td colspan='8'>Không có sản phẩm nào.</td></tr>";
        return;
      }

      products.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <th scope="row">${product.id}</th>
            <td>${product.name ?? "Không có tên"}</td>
            <td>${product.description ?? "Không có mô tả"}</td>
            <td>${
              product.image_url
                ? `<img src="${product.image_url}" alt="${product.name}" class="img-thumbnail" style="width: 100px; height: auto;" />`
                : "Không có ảnh"
            }</td>
            <td>${
              product.price
                ? Math.round(product.price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "Chưa có giá"
            }<sup>₫</sup>
            </td>
            <td>${product.stock ?? "Không có số lượng"}</td>
            <td>
              <button class="btn-update btn" data-id="${
                product.id
              }">Update</button>
              <button class="btn-delete btn" data-id="${
                product.id
              }">Delete</button>
            </td>
          `;

        tableBody.appendChild(row);
      });

      setupUpdateButtons();
      setupDeleteButtons();
      renderPagination();
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      tableBody.innerHTML =
        "<tr><td colspan='8'>Không thể tải dữ liệu.</td></tr>";
    }
  }

  function setupUpdateButtons() {
    document.querySelectorAll(".btn-update").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.dataset.id;
        window.location.href = `/admin/update-product.html?id=${productId}`;
      });
    });
  }

  function setupDeleteButtons() {
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const productId = btn.dataset.id;
        const confirmDelete = confirm("Bạn có chắc muốn xoá sản phẩm này?");
        if (!confirmDelete) return;

        try {
          const token = localStorage.getItem("token");
          const res = await fetch(
            `http://localhost:3000/api/v1/products/${productId}`,
            {
              method: "DELETE",
              headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
              },
            }
          );

          if (res.ok) {
            alert("Xoá thành công!");
            fetchProducts(currentPage);
          } else {
            alert("Xoá thất bại!");
          }
        } catch (err) {
          console.error("Lỗi khi xoá sản phẩm:", err);
          alert("Đã có lỗi xảy ra.");
        }
      });
    });
  }

  function renderPagination() {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = "page-btn";
      if (i === currentPage) pageButton.classList.add("active");

      pageButton.addEventListener("click", () => {
        currentPage = i;
        fetchProducts(currentPage);
      });

      pagination.appendChild(pageButton);
    }
  }

  fetchProducts(currentPage);
});

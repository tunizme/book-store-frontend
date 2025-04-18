document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("productTableBody");

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/products");
      const data = await response.json();
      const products = data.products || [];

      tableBody.innerHTML = "";

      if (products.length === 0) {
        tableBody.innerHTML =
          "<tr><td colspan='4'>Không có sản phẩm nào.</td></tr>";
        return;
      }

      products.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <th scope="row">${product.id}</th>
            <td>${product.name ?? "Không có tên"}</td>
            <td>${product.description ?? "Không có mô tả"}</td>
            <td>${
              product.price
                ? parseFloat(product.price).toLocaleString() + "đ"
                : "Chưa có giá"
            }</td>
            <td>${product.stock ?? "Không có số lượng"}
            <td>
              <button class="btn-update" data-id="${product.id}">Update</button>
              <button class="btn-delete" data-id="${product.id}">Delete</button>
            </td>
          `;

        tableBody.appendChild(row);
      });
      document.querySelectorAll(".btn-update").forEach((btn) => {
        btn.addEventListener("click", () => {
          const productId = btn.dataset.id;
          window.location.href = `/admin/update-product.html?id=${productId}`;
        });
      });

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
              fetchProducts();
            } else {
              alert("Xoá thất bại!");
            }
          } catch (err) {
            console.error("Lỗi khi xoá sản phẩm:", err);
            alert("Đã có lỗi xảy ra.");
          }
        });
      });
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      tableBody.innerHTML =
        "<tr><td colspan='4'>Không thể tải dữ liệu.</td></tr>";
    }
  }

  fetchProducts();
});

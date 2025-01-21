import { fetchData } from "../utils/fetchData.js"; // Import fetchData

import { CATEGORY_CONFIG } from "../controllers/categoryController.js";

// Lấy tham số từ URL (id và category)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const category = urlParams.get("category");

// Kiểm tra xem category có tồn tại trong cấu hình không
if (CATEGORY_CONFIG[category]) {
  const { jsonFile } = CATEGORY_CONFIG[category];

  // Sử dụng hàm fetchData để lấy dữ liệu
  fetchData(jsonFile)
    .then((data) => {
      // Xác định key sản phẩm dựa trên category (ví dụ: balo => baloProducts, shoes => shoesProducts)
      const productKey = `${category}Products`;

      if (data[productKey] && Array.isArray(data[productKey])) {
        // Tìm sản phẩm có id trùng khớp trong danh sách sản phẩm
        const product = data[productKey].find((item) => item.id === productId);

        if (product) {
          // Cập nhật thông tin vào trang chi tiết sản phẩm
          document.querySelector(".product-detail__title").textContent = product.name;
          document.querySelector(".product-detail__price").textContent = product.price;
          // Kiểm tra nếu có ảnh highResolution, sử dụng ảnh đó, nếu không thì mặc định
          const productImage = product.images.highResolution || product.images.default;
          document.querySelector(".product-detail__image").src = productImage;
          document.querySelector(".product-detail__description").textContent = product.description || "Không có mô tả.";

          // Hiển thị thông số kỹ thuật sản phẩm (nếu có)
          const specContainer = document.querySelector(".product-detail__specifications");
          specContainer.innerHTML = ""; // Xóa nội dung cũ
          if (product.specifications) {
            for (const [key, value] of Object.entries(product.specifications)) {
              specContainer.innerHTML += `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`;
            }
          } else {
            specContainer.innerHTML = "<li>Không có thông số kỹ thuật.</li>";
          }

          // Hiển thị hình ảnh thumbnail nếu có
          const thumbnailsContainer = document.querySelector(".product-detail__thumbnails");
          thumbnailsContainer.innerHTML = ""; // Xóa nội dung cũ
          if (product.thumbnails && Array.isArray(product.thumbnails)) {
            product.thumbnails.forEach((thumb) => {
              const img = document.createElement("img");
              img.src = thumb;
              img.alt = "Thumbnail";
              img.classList.add("thumbnail");

              // Sự kiện hover đổi ảnh chính
              img.addEventListener("mouseover", () => {
                document.querySelector(".product-detail__image").src = thumb;
              });

              thumbnailsContainer.appendChild(img);
            });
          } else {
            thumbnailsContainer.innerHTML = "<p>Không có hình ảnh thu nhỏ.</p>";
          }
        } else {
          document.querySelector(".product-detail").innerHTML = "<p>Sản phẩm không tồn tại!</p>";
        }
      } else {
        console.error(`Lỗi: Dữ liệu không hợp lệ hoặc thiếu key '${productKey}'`);
        document.querySelector(".product-detail").innerHTML = `<p>Không tìm thấy sản phẩm cho danh mục "${category}".</p>`;
      }
    })
    .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
} else {
  document.querySelector(".product-detail").innerHTML = "<p>Loại sản phẩm không hợp lệ!</p>";
}

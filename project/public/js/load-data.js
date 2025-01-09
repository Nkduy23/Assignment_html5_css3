import { renderSaleProduct, renderRegularProduct } from './render-product.js';
import { addColorChangeEventListeners } from './color-change.js';
import { updateProductProgress } from './progress-update.js';  // Import hàm cập nhật tiến độ

// Hàm loadData() để tải dữ liệu và render sản phẩm
function loadData() {
  fetch("project/json/products-main.json") // Đảm bảo bạn đã xác định đúng đường dẫn đến tệp JSON
    .then((response) => response.json())
    .then((products) => {
      // Xử lý dữ liệu và render sản phẩm
      products.forEach((product) => {
        console.log(product); // Kiểm tra dữ liệu sản phẩm

        if (product.type === "sale") {
          // Render sản phẩm Sale
          renderSaleProduct(product);
        } else {
          // Render sản phẩm Regular
          renderRegularProduct(product);
        }
      });

      // Gọi hàm gắn sự kiện sau khi render xong
      addColorChangeEventListeners();

      // Cập nhật tiến độ cho các sản phẩm
      updateProductProgress();
    })
    .catch((error) => console.error("Error loading products:", error));
}

export { loadData };

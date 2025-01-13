import { renderSaleProduct, renderRegularProductByCategory } from './render-product.js';
import { addColorChangeEventListeners } from './color-change.js';
import { updateProductProgress } from './progress-update.js'; // Import hàm cập nhật tiến độ

function loadData(container) {
  fetch("json/products-main.json") // Đảm bảo bạn đã xác định đúng đường dẫn đến tệp JSON
    .then((response) => response.json())
    .then((products) => {
      // Duyệt qua từng nhóm sản phẩm trong JSON
      if (products.saleProducts && Array.isArray(products.saleProducts)) {
        products.saleProducts.forEach((product) => {
          renderSaleProduct(product, container); // Truyền container vào hàm renderSaleProduct
        });
      }

      if (products.regularProducts && Array.isArray(products.regularProducts)) {
        products.regularProducts.forEach((product) => {
          renderRegularProductByCategory(product, container); // Truyền container vào hàm renderRegularProductByCategory
        });
      }

      // Gắn sự kiện sau khi render xong
      addColorChangeEventListeners();

      // Cập nhật tiến độ cho các sản phẩm
      updateProductProgress();
    })
    .catch((error) => console.error("Error loading products:", error));
}

// Gọi loadData với container là phần tử DOM mà bạn muốn render sản phẩm vào
document.addEventListener("DOMContentLoaded", () => {
  const saleContainer = document.getElementById("flash-sale-products");
  if (saleContainer) {
    console.log("Container found! Fetching data...");
    loadData(saleContainer); // Render sản phẩm vào container flash-sale-products
  } else {
    console.error("Sale container not found!");
  }
});

export { loadData };

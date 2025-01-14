import { renderSaleProduct, renderRegularProductByCategory } from './render-product.js';
import { addColorChangeEventListeners } from './color-change.js';
import { updateProductProgress } from './progress-update.js';

// Gọi loadData với container là phần tử DOM mà bạn muốn render sản phẩm vào
// document.addEventListener("DOMContentLoaded", () => {
//   const saleContainer = document.getElementById("flash-sale-products");
  
//   if (saleContainer) {
//     console.log("Container found! Fetching data...");
//     loadData(saleContainer); // Render sản phẩm vào container flash-sale-products
//   } else {
//     console.error("Sale container not found!");
//   }
// });

function loadData(container) {
  if (!container) {
    console.error("Container is undefined or null.");
    return;
  }

  fetch("json/products-main.json")
    .then((response) => response.json())
    .then((products) => {
      // Xóa nội dung cũ trước khi render
      container.innerHTML = "";
      console.log(products);
      if (products.saleProducts && Array.isArray(products.saleProducts)) {
        products.saleProducts.forEach((product) => {
          renderSaleProduct(product, container); // Truyền container vào hàm renderSaleProduct
        });
      }else{
        console.error("Sale container is undefined or null.");
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

export { loadData };

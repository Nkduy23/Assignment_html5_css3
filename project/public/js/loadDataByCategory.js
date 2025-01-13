import { renderSaleProduct, renderRegularProductByCategory } from "./render-product.js";
import { addColorChangeEventListeners } from "./color-change.js";
import { updateProductProgress } from "./progress-update.js";
console.log("loadDataByCategory.js");

function loadDataByCategory(category) {
  // Xác định file JSON dựa trên category
  let jsonFile = "";
  switch (category) {
    case "sale":
      jsonFile = "json/products-sale.json";
      break;
    case "regular":
      jsonFile = "json/products-regular.json";
      break;
    case "category1":
      jsonFile = "json/products-category1.json";
      break;
    case "category2":
      jsonFile = "json/products-category2.json";
      break;
    default:
      console.warn("Category not found. Loading default data.");
      jsonFile = "json/products-main.json"; // File mặc định nếu không có category
  }

  console.log(`Loading products from: ${jsonFile}`);

  // Chắc chắn DOM đã sẵn sàng
// Loại bỏ sự kiện DOMContentLoaded và thử trực tiếp chạy code bên ngoài
const container = document.getElementById("sale-category"); // Khu vực render sản phẩm
if (container) {
  console.log("Container found! Fetching data...");
  fetch(jsonFile)
    .then((response) => response.json())
    .then((products) => {
      console.log("Products loaded:", products);

      if (category === "sale" && products.saleProducts) {
        products.saleProducts.forEach((product) => renderSaleProduct(product, container));
      } else if (category === "regular" && products.regularProducts) {
        products.regularProducts.forEach((product) => renderRegularProductByCategory(product, container));
      } else {
        console.warn("No products found for this category.");
      }

      // Gắn sự kiện sau khi render xong
      addColorChangeEventListeners();
      updateProductProgress();
      
    })
    .catch((error) => console.error("Error loading products:", error));
} else {
  console.error("Container element not found!");
}

}

export { loadDataByCategory };

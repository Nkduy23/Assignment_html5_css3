import { renderSaleProduct, renderRegularProductByCategory } from "./render-product.js";
import { addColorChangeEventListeners } from "./color-change.js";
import { updateProductProgress } from "./progress-update.js";

function loadDataByCategory(category) {
  let jsonFile = "";
  switch (category) {
    case "sale":
      jsonFile = "json/products-sale.json";
      break;
    case "regular":
      jsonFile = "json/products-regular.json";
      break;
    case "category1":
      jsonFile = "json/products-regular2.json";
      break;
    case "category2":
      jsonFile = "json/products-regular3.json";
      break;
    default:
      console.warn("Category not found. Loading default data.");
      jsonFile = "json/products-main.json";
  }

  console.log(`Loading products from: ${jsonFile}`);

const container = document.getElementById("sale-category");
if (container) {
  console.log("Container found! Fetching data...");
  fetch(jsonFile)
    .then((response) => response.json())
    .then((products) => {
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

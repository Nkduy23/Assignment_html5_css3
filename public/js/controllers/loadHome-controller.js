import { renderSaleProduct, renderRegularProductByCategory } from "../views/product-renderer.js";
import { addColorChangeEventListeners } from "../views/product-color-events.js";
import { updateProductProgress } from "../views/progress-updater.js";

function loadData(container) {
  if (!container) {
    console.error("Container is undefined or null.");
    return;
  }

  fetch("/public/data/products-main.json")
    .then((response) => response.json())
    .then((products) => {
      container.innerHTML = "";
      // console.log(products);

      if (products.saleProducts && Array.isArray(products.saleProducts)) {
        products.saleProducts.forEach((product) => {
          renderSaleProduct(product, container);
        });
      } else {
        console.error("Sale container is undefined or null.");
      }

      if (products.regularProducts && Array.isArray(products.regularProducts)) {
        products.regularProducts.forEach((product) => {
          renderRegularProductByCategory(product, container);
        });
      } else {
        console.error("regular container is undefined or null.");
      }

      addColorChangeEventListeners();
      updateProductProgress();
    })
    .catch((error) => console.error("Error loading products:", error));
}

export { loadData };

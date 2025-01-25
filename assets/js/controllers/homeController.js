import { fetchData } from "../utils/fetchData.js"; // Import fetchData
import { renderSaleProduct, renderRegularProductByCategory } from "../views/productRenderView.js";
import { addColorChangeEventListeners } from "../views/productColorEventView.js";
import { updateProductProgress } from "../views/progressProductView.js";

function loadData(container) {
  if (!container) {
    console.error("Container is undefined or null.");
    return;
  }

  // Gọi hàm fetchData để lấy dữ liệu
  fetchData("data/productsHome.json")
    .then((products) => {
      container.innerHTML = "";

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
        console.error("Regular container is undefined or null.");
      }

      addColorChangeEventListeners();
      updateProductProgress();
    })
    .catch((error) => console.error("Error loading products:", error));
}

export { loadData };

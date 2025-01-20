import { loadData } from "./homeController.js";

function handleProductLoading() {
  const saleContainer = document.getElementById("flash-sale-products");

  if (saleContainer) {
    console.log("Sale container found! Fetching sale data...");
    loadData(saleContainer);
  } else {
    console.error("Sale container not found!");
  }
}

export { handleProductLoading };

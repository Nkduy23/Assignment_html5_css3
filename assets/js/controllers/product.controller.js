import { loadHomePage } from "./home.controller.js";

export function handleProductLoading() {
  const saleContainer = document.getElementById("flash-sale-products");

  if (saleContainer) {
    console.log("Sale container found! Fetching sale data...");
    loadHomePage(saleContainer);
  } else {
    console.log("No sale container found. Rendering regular products...");
    loadHomePage();
  }
}
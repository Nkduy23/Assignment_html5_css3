import { loadData } from "./controllers/loadHome-controller.js";

document.addEventListener("DOMContentLoaded", () => {
  const saleContainer = document.getElementById("flash-sale-products");
  if (saleContainer) {
    console.log("Container found! Fetching data...");
    loadData(saleContainer);
  } else {
    console.error("Sale container not found!");
  }
});

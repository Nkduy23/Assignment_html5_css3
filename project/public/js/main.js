import { loadData } from "./load-data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Xác định container cần truyền
  const saleContainer = document.getElementById("flash-sale-products");

  if (saleContainer) {
    console.log("Container found! Fetching data...");
    loadData(saleContainer); // Truyền container vào loadData
  } else {
    console.error("Sale container not found!");
  }

  // Xử lý sự kiện click cho nút "Xem tất cả"
  const saleCategoryButton = document.getElementById("sale-category");
  if (saleCategoryButton) {
    saleCategoryButton.addEventListener("click", (event) => {
      event.preventDefault(); // Ngăn không tải lại trang
      window.location.href = "sale.html?category=sale";
    });
  } else {
    console.error("Không tìm thấy phần tử #sale-category trong DOM!");
  }
});

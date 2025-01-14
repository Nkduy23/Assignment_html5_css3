import { loadData } from "./load-data.js";

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  // Lắng nghe sự kiện click vào nút "Xem tất cả"
  const saleCategoryButton = document.getElementById("sale-category");
  // console.log(`saleCategoryButton: ${saleCategoryButton}`);

  if (saleCategoryButton) {
    saleCategoryButton.addEventListener("click", (event) => {
      event.preventDefault(); // Ngăn không cho thẻ <a> tải lại trang

      // Chuyển hướng tới trang sale.html với tham số category=sale
      window.location.href = "sale.html?category=sale";
    });
  } else {
    console.error("Không tìm thấy phần tử #sale-category trong DOM!");
  }
});
